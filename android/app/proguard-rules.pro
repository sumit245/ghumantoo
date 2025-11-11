# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Razorpay SDK - Keep classes to prevent obfuscation and improve load time
-keep class com.razorpay.** { *; }
-dontwarn com.razorpay.**
-keepclassmembers class com.razorpay.** { *; }

# React Native Razorpay bridge
-keep class com.razorpay.rn.** { *; }
-dontwarn com.razorpay.rn.**

# Keep native methods for Razorpay
-keepclasseswithmembernames class * {
    native <methods>;
}

# Optimize: Remove logging in release builds for faster performance
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}

# Add any project specific keep options here:
