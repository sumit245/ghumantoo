# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# React Native Core
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}
-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}
-keep class com.facebook.react.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.react.**
-dontwarn com.facebook.hermes.**

# React Native Turbo Modules
-keep class com.facebook.react.turbomodule.** { *; }
-keep interface com.facebook.react.bridge.** { *; }

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.swmansion.common.** { *; }
-dontwarn com.swmansion.reanimated.**

# React Native Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }
-keep class com.swmansion.rnscreens.** { *; }
-dontwarn com.swmansion.gesturehandler.**

# React Navigation
-keep class com.reactnativecommunity.** { *; }
-dontwarn com.reactnativecommunity.**

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

# Redux / AsyncStorage
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
}

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep constructors for classes with @ReactModule annotation
-keep,allowobfuscation @interface com.facebook.react.module.annotations.ReactModule
-keep @com.facebook.react.module.annotations.ReactModule class * { *; }

# Prevent obfuscation of models used in React Native
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes EnclosingMethod

# Add any project specific keep options here:
