// mypreset.ts
import { definePreset, palette } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: palette('#134AA9'), // Uses the existing Indigo color palette
    success: palette('#10b981'),  // Custom success color (Teal-500)
    danger: palette('#ef4444')    // Custom danger color (Red-500)
  }
});

export default MyPreset;
