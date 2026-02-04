# NgProgress Provider Fix

## Issue

After migrating to standalone components, the application was showing this error:

```
ERROR ɵNotFound: NG0201: No provider found for `NgProgress`. 
Source: Standalone[AboutUsComponent]
```

## Root Cause

When migrating from module-based to standalone architecture, services that were previously provided by modules need to be explicitly provided in the application configuration.

The `NgProgress` service from `@ngx-progressbar/core` was being used in many components but wasn't provided in `app.config.ts`.

## Components Using NgProgress

The following components inject `NgProgress`:

**Pages:**
- AboutUsComponent
- BlockListComponent
- UnitsComponent
- SectorsComponent
- ZoonsComponent
- BuildsComponent
- SectorGatesComponent
- SectorResidenceGatesComponent
- ResidenceZoonsComponent
- ResidenceBuildsComponent
- ResidenceFlatsComponent
- PeopleComponent
- CompaniesComponent
- CheckComponent

**Permits Module:**
- AllPermitsComponent
- SecurityProtectionComponent
- SecurityProtectionOpprovalComponent
- PermitsDepartmentComponent
- PermitsDepartmentOpprovalComponent
- PermitsPrintComponent
- GatesComponent
- GatesHousingComponent
- EnquiryComponent
- DepartmentReferenceComponent
- DepartmentReferenceOpprovalComponent
- CanclePermitComponent
- RenewPermitComponent
- AddNewPermitsComponent
- AddHousingPermitComponent

## Solution

Added `NgProgressModule` to the `app.config.ts` providers:

```typescript
import { NgProgressModule } from '@ngx-progressbar/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    provideAnimations(),

    importProvidersFrom(
      TranslateModule.forRoot({...}),
      SweetAlert2Module.forRoot(),
      TooltipModule.forRoot(),
      TabsModule.forRoot(),
      GoogleMapsModule,
      NgProgressModule  // ✅ Added this
    ),
    
    // ... other providers
  ]
};
```

## Important Notes

1. **No forRoot() method**: Unlike some other modules, `NgProgressModule` doesn't have a `forRoot()` method. Just import the module directly.

2. **Global availability**: By adding it to `importProvidersFrom()`, the `NgProgress` service becomes available to all components in the application.

3. **Usage pattern**: Components typically use it like this:
   ```typescript
   constructor(private progress: NgProgress) {}
   
   ngOnInit() {
      
      
     // ... do work
     
   }
   ```

## Testing

After this fix:
- ✅ All pages should load without the NG0201 error
- ✅ Progress bars should work correctly
- ✅ Navigation should work smoothly

## Other Common Provider Issues

When migrating to standalone, watch out for these common services that need to be provided:

1. **NgProgress** - `@ngx-progressbar/core` ✅ Fixed
2. **TranslateService** - `@ngx-translate/core` ✅ Already provided
3. **SweetAlert2** - `@sweetalert2/ngx-sweetalert2` ✅ Already provided
4. **Custom services** - Make sure they have `providedIn: 'root'` or are provided in app.config.ts

## Related Files Modified

- `src/app/app.config.ts` - Added NgProgressModule to providers
