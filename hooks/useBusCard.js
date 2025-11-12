import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

/**
 * Custom hook for BusCard business logic
 * 
 * Handles:
 * - Discount calculation with coupons
 * - Price computation
 * - Travel duration calculation
 * - Memoized expensive computations
 * 
 * @param {Object} bus - Bus object with pricing and timing data
 * @returns {Object} Computed values for BusCard rendering
 */
export const useBusCard = (bus) => {
    const { activeCoupons } = useSelector((state) => state.bus);

    /**
     * Get the first active coupon (best available offer)
     * Memoized to avoid recalculation on every render
     */
    const firstCoupon = useMemo(() => {
        return activeCoupons?.[0] || null;
    }, [activeCoupons]);

    /**
     * Calculate discount based on coupon type
     * @param {number} basePrice - Original ticket price
     * @param {Object} coupon - Coupon object with discount details
     * @returns {Object} { newPrice, savedAmount }
     */
    const calculateDiscount = useMemo(() => {
        const basePrice = parseFloat(bus.BusPrice?.BasePrice);

        if (!firstCoupon || !basePrice) {
            return { newPrice: basePrice, savedAmount: 0 };
        }

        let savedAmount = 0;

        if (firstCoupon.discount_type === 'fixed') {
            savedAmount = firstCoupon.coupon_value;
        } else if (firstCoupon.discount_type === 'percentage') {
            savedAmount = (basePrice * firstCoupon.coupon_value) / 100;
        }

        const newPrice = Math.max(0, basePrice - savedAmount);

        return {
            newPrice: Math.round(newPrice),
            savedAmount: Math.round(savedAmount)
        };
    }, [bus.BusPrice?.BasePrice, firstCoupon]);

    /**
     * Calculate travel duration in hours and minutes
     * Memoized to avoid dayjs recalculation
     */
    const travelDuration = useMemo(() => {
        const durationMs = dayjs(bus.ArrivalTime).diff(dayjs(bus.DepartureTime));
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h:${minutes}m`;
    }, [bus.DepartureTime, bus.ArrivalTime]);

    /**
     * Format departure and arrival times
     * Memoized to avoid repeated dayjs formatting
     */
    const formattedTimes = useMemo(() => ({
        departure: dayjs(bus.DepartureTime).format('h:mmA'),
        arrival: dayjs(bus.ArrivalTime).format('h:mmA')
    }), [bus.DepartureTime, bus.ArrivalTime]);

    /**
     * Coupon banner data
     * Only computed when coupon exists
     */
    const couponBanner = useMemo(() => {
        if (!firstCoupon) return null;

        const discountText = firstCoupon.discount_type === 'percentage'
            ? `Get ${firstCoupon.coupon_value}% off with code ${firstCoupon.coupon_code}!`
            : `Save ₹${firstCoupon.coupon_value} with code ${firstCoupon.coupon_code}!`;

        return {
            text: discountText,
            code: firstCoupon.coupon_code
        };
    }, [firstCoupon]);

    return {
        // Pricing
        basePrice: parseFloat(bus.BusPrice?.BasePrice),
        discountedPrice: calculateDiscount.newPrice,
        savedAmount: calculateDiscount.savedAmount,

        // Timing
        departureTime: formattedTimes.departure,
        arrivalTime: formattedTimes.arrival,
        duration: travelDuration,

        // Coupon
        couponBanner,
        hasCoupon: !!firstCoupon,

        // Bus details (pass-through for convenience)
        availableSeats: bus.AvailableSeats,
        busName: bus.TravelName,
        busType: bus.FullBusName || bus.BusType,
    };
};
