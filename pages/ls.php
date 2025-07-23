<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Stores; // Assuming model paths
use App\Models\Project;
use App\Models\User;
use App\Models\Inventory;
use App\Models\InventroyStreetLightModel;
use App\Models\InventoryDispatch;
use Exception;

class InventoryController extends Controller
{
    /**
     * Optimized function to view store inventory.
     *
     * This method fetches summary data using efficient database aggregates
     * and retrieves the full inventory list for display.
     *
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function viewInventory(Request $request)
    {
        try {
            $projectId = $request->project_id;
            $storeId = $request->store_id;

            // 1. Fetch primary records efficiently
            $store = Stores::with('storeIncharge')->findOrFail($storeId);
            $project = Project::findOrFail($projectId);

            $storeName = $store->store_name;
            $inchargeName = $store->storeIncharge ? $store->storeIncharge->firstName . ' ' . $store->storeIncharge->lastName : 'N/A';
            $projectType = $project->project_type;

            // 2. Determine the correct model
            $inventoryModel = ($projectType == 1) ? InventroyStreetLightModel::class : Inventory::class;

            // 3. Get all inventory summary stats in ONE database query
            $inventoryStats = $inventoryModel::where('project_id', $projectId)
                ->where('store_id', $storeId)
                ->select(
                    'item_code',
                    DB::raw('COUNT(*) as total_items'),
                    DB::raw('MAX(rate) as item_rate') // Use MAX, AVG, or MIN as appropriate for your business logic
                )
                ->groupBy('item_code')
                ->get()
                ->keyBy('item_code'); // Key by item_code for easy access e.g., $inventoryStats['SL01']

            // 4. Get all dispatch summary stats in ONE database query
            $dispatchStats = InventoryDispatch::where('isDispatched', true)
                ->where('project_id', $projectId) // Assumes dispatches are linked to projects
                ->where('store_id', $storeId)
                ->select(
                    'item_code',
                    DB::raw('COUNT(*) as dispatched_items'),
                    DB::raw('SUM(total_value) as dispatched_value')
                )
                ->groupBy('item_code')
                ->get()
                ->keyBy('item_code');

            // 5. Get the full inventory list for displaying in the view's table
            // This is the only place we use ->get() on the full list
            $inventory = $inventoryModel::where('project_id', $projectId)
                ->where('store_id', $storeId)
                ->with('dispatch') // Keep eager loading if you list dispatch status per item
                ->get();

            // 6. Calculate totals using the efficient stats (with null-coalescing for safety)
            // Battery Data ('SL03')
            $totalBattery = $inventoryStats->get('SL03')->total_items ?? 0;
            $batteryRate = $inventoryStats->get('SL03')->item_rate ?? 0;
            $totalBatteryValue = $batteryRate * $totalBattery;
            $batteryDispatch = $dispatchStats->get('SL03')->dispatched_items ?? 0;
            $dispatchAmountBattery = $dispatchStats->get('SL03')->dispatched_value ?? 0;
            $availableBattery = $totalBattery - $batteryDispatch;

            // Luminary Data ('SL02')
            $totalLuminary = $inventoryStats->get('SL02')->total_items ?? 0;
            $luminaryRate = $inventoryStats->get('SL02')->item_rate ?? 0;
            $totalLuminaryValue = $luminaryRate * $totalLuminary;
            $luminaryDispatch = $dispatchStats->get('SL02')->dispatched_items ?? 0;
            $dispatchAmountLuminary = $dispatchStats->get('SL02')->dispatched_value ?? 0;
            $availableLuminary = $totalLuminary - $luminaryDispatch;

            // Module Data ('SL01')
            $totalModule = $inventoryStats->get('SL01')->total_items ?? 0;
            $moduleRate = $inventoryStats->get('SL01')->item_rate ?? 0;
            $totalModuleValue = $moduleRate * $totalModule;
            $moduleDispatch = $dispatchStats->get('SL01')->dispatched_items ?? 0;
            $dispatchAmountModule = $dispatchStats->get('SL01')->dispatched_value ?? 0;
            $availableModule = $totalModule - $moduleDispatch;

            // Structure Data (Derived from Battery, as per original logic)
            $totalStructure = $totalBattery;
            $totalStructureValue = $totalBattery * 400; // Business rule
            $structureDispatch = $batteryDispatch;
            $availableStructure = $availableBattery;

            return view('inventory.view', [
                // Pass calculated values, formatting in the view (Blade) is recommended
                'inventory' => $inventory,
                'projectId' => $projectId,
                'storeName' => $storeName,
                'inchargeName' => $inchargeName,
                'projectType' => $projectType,
                'totalBattery' => $totalBattery,
                'totalBatteryValue' => $totalBatteryValue,
                'batteryDispatch' => $batteryDispatch,
                'availableBattery' => $availableBattery,
                'dispatchAmountBattery' => $dispatchAmountBattery,
                'totalLuminary' => $totalLuminary,
                'totalLuminaryValue' => $totalLuminaryValue,
                'luminaryDispatch' => $luminaryDispatch,
                'availableLuminary' => $availableLuminary,
                'totalModule' => $totalModule,
                'totalModuleValue' => $totalModuleValue,
                'moduleDispatch' => $moduleDispatch,
                'availableModule' => $availableModule,
                'dispatchAmountModule' => $dispatchAmountModule,
                'totalStructure' => $totalStructure,
                'totalStructureValue' => $totalStructureValue,
                'structureDispatch' => $structureDispatch,
                'availableStructure' => $availableStructure,
            ]);
        } catch (Exception $e) {
            Log::error("Error in viewInventory: " . $e->getMessage());
            // Redirect back with an error message for a better user experience
            return back()->with('error', 'Could not load inventory data. Please try again.');
        }
    }
}