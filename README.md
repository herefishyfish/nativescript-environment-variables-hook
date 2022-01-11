# Nativescript Environment Variable Hook

This plugin adds a hook to find and replace environment variables within your `AndroidManifest.xml` and `Info.plist`.


# Installation

`ns plugin add nativescript-environment-variable-hook`

# Usage

Example

*App_Resources\Android\src\main\AndroidManifest.xml*
```
<activity android:name="org.nativescript.auth0.RedirectActivity" tools:node="replace">
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />

    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />

    <data
      android:host="{{AUTH0_DOMAIN}}"
      android:pathPrefix="/android/{{BUNDLE_IDENTIFIER}}/callback"
      android:scheme="{{BUNDLE_IDENTIFIER}}" />
  </intent-filter>
</activity>
```

*.env or Environment Variables*
```
AUTH0_DOMAIN = "my.domain.auth0.com"
BUNDLE_IDENTIFIER = "org.nativescript.example"
```

# Additional Templated Files
You can extend the functionality of this hook by adding in additional relative filepaths to you `nativescript.config.ts` like so

*nativescript.config.ts*
```
export default {
  id: 'org.nativescript.example',
  appPath: 'src',
  appResourcesPath: 'app_resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  environmentVariableHook: {
    additionalPaths: [
      'platforms/android/*'
    ]
  }
} as NativeScriptConfig;

```