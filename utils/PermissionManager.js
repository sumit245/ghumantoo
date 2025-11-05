import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Lightweight network check (no new deps). Uses a small Google URL that returns 204.
const DEFAULT_PING_URL = 'https://www.google.com/generate_204';
const DEFAULT_PING_INTERVAL = 5000; // ms

export function useNetwork({ pingUrl = DEFAULT_PING_URL, interval = DEFAULT_PING_INTERVAL } = {}) {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        let mounted = true;
        let timer = null;

        const ping = async () => {
            try {
                const controller = new AbortController();
                const id = setTimeout(() => controller.abort(), 3000);
                const res = await fetch(pingUrl, { method: 'GET', signal: controller.signal });
                clearTimeout(id);
                if (!mounted) return;
                setIsConnected(res && (res.status === 204 || res.ok));
            } catch (e) {
                if (!mounted) return;
                setIsConnected(false);
            }
        };

        // initial check
        ping();
        timer = setInterval(ping, interval);

        return () => {
            mounted = false;
            if (timer) clearInterval(timer);
        };
    }, [pingUrl, interval]);
    return isConnected;
}

// Request runtime location permission on Android; on iOS the app should include NSLocationWhenInUseUsageDescription.
export async function requestLocationPermission() {
    if (Platform.OS === 'android') {
        try {
            // Check existing permissions first
            const fineCheck = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            const coarseCheck = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
            if (fineCheck || coarseCheck) return true;


            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            ]);

            const fine = granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
            const coarse = granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];
            return fine === PermissionsAndroid.RESULTS.GRANTED || coarse === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn('requestLocationPermission error', err);
            return false;
        }
    }
    // On iOS, assume permission will be requested by the native layer when geolocation is used
    return true;
}

// Check whether location permission is granted (Android). iOS check is a best-effort and returns true.
export async function hasLocationPermission() {
    if (Platform.OS === 'android') {
        try {
            const fine = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            const coarse = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
            return fine || coarse;
        } catch (e) {
            console.warn('hasLocationPermission error', e);
            return false;
        }
    }
    // On iOS we cannot reliably check without additional native modules; return false to be safe
    return false;
}

export function getCurrentLocation(options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }) {
    return new Promise((resolve, reject) => {
        try {
            if (!navigator || !navigator.geolocation || !navigator.geolocation.getCurrentPosition) {
                const err = new Error('Geolocation API not available. You may need react-native-geolocation-service or another geolocation library.');
                console.warn('getCurrentLocation error: geolocation not available');
                reject(err);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (pos) => resolve(pos.coords),
                (err) => {
                    console.warn('getCurrentLocation geolocation error', err);
                    reject(err);
                },
                options
            );
        } catch (e) {
            reject(e);
        }
    });
}

// Reverse geocode using Nominatim (OpenStreetMap) to obtain a city name. This is free but should be used sparingly in production.
export async function reverseGeocode(lat, lon) {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const res = await fetch(url, { headers: { 'User-Agent': 'Ghumantoo-App/1.0' } });
        if (!res.ok) return null;
        const data = await res.json();
        // data.address may contain city, town, village
        const addr = data.address || {};
        return addr.city || addr.town || addr.village || addr.county || null;
    } catch (e) {
        console.warn('reverseGeocode error', e);
        return null;
    }
}

// Notification permission request for Android (POST_NOTIFICATIONS on Android 13+)
export async function requestNotificationPermission() {
    if (Platform.OS === 'android') {
        try {
            // If POST_NOTIFICATIONS exists on this platform, check first
            if (PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS) {
                const already = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                if (already) {
                    await AsyncStorage.setItem('notifications_enabled', 'true');
                    return true;
                }
                const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                const granted = res === PermissionsAndroid.RESULTS.GRANTED;
                await AsyncStorage.setItem('notifications_enabled', granted ? 'true' : 'false');
                return granted;
            }
            // older Android versions do not need runtime permission
            await AsyncStorage.setItem('notifications_enabled', 'true');
            return true;
        } catch (e) {
            console.warn('requestNotificationPermission error', e);
            return false;
        }
    }

    // iOS: rely on native prompt (left for native module). We set a flag and the app can later integrate a notifications library if needed.
    await AsyncStorage.setItem('notifications_enabled', 'prompt_needed');
    return true;
}

export async function isNotificationEnabled() {
    try {
        const v = await AsyncStorage.getItem('notifications_enabled');
        return v === 'true';
    } catch (e) {
        return false;
    }
}

export async function hasNotificationPermission() {
    if (Platform.OS === 'android') {
        try {
            if (PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS) {
                const ok = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                return ok;
            }
            return true; // older SDKs
        } catch (e) {
            console.warn('hasNotificationPermission error', e);
            return false;
        }
    }
    // iOS: cannot check reliably without native APIs here; return false to indicate unknown
    return false;
}
