# Centralized Styles System

This directory contains the centralized styling system for the React Native application. All styles are organized into logical modules for better maintainability and consistency.

## Structure

```
utils/styles/
├── colors.js      # Color tokens and theme colors
├── spacing.js     # Spacing utilities (margins, padding)
├── typography.js  # Text styles and font sizes
├── layouts.js     # Common layout patterns
├── message.js     # Semantic message styles (success, error, warning)
└── index.js       # Barrel file re-exporting all modules
```

## Usage

### Importing Styles

Import from the centralized `utils/styles` module:

```javascript
import { 
  // Colors
  PrimaryColor, 
  WhiteColor, 
  BlackColor, 
  DangerColor,
  SuccessColor,
  
  // Typography
  typography,
  
  // Spacing
  spacing,
  
  // Layouts
  layouts,
  
  // Message styles
  message,
  
  // Global styles object
  styles,
  width,
  height
} from '../utils/styles';
```

### Colors

Use color tokens for consistent theming:

```javascript
import { PrimaryColor, WhiteColor, BlackColor, DangerColor } from '../utils/styles';

<View style={{ backgroundColor: PrimaryColor }}>
  <Text style={{ color: WhiteColor }}>Hello</Text>
</View>
```

**Available Colors:**
- `PrimaryColor` - Main brand color (#cf413a)
- `SecondaryColor` - Secondary brand color
- `AccentColor` - Accent color
- `WarningColor` - Warning messages (#FFC187)
- `DangerColor` - Error/danger states (#DC3545)
- `SuccessColor` - Success states (#66A765)
- `WhiteColor` - Light background (#f3f3f7)
- `PureWhite` - Pure white (#FFFFFF)
- `BlackColor` - Primary text color (#212427)
- `DarkGray` - Secondary text (#616161)
- `LightGray` - Borders/dividers (#C2C2C2)

### Typography

Use typography utilities for consistent text styling:

```javascript
import { typography } from '../utils/styles';

<Text style={[typography.font16, typography.textBold, { color: BlackColor }]}>
  Heading
</Text>
```

**Available Typography:**
- Font sizes: `font6`, `font8`, `font10`, `font12`, `font14`, `font16`, `font18`, `font20`, `font22`, `font24`, `font26`, `font40`
- Text styles: `textBold`, `textPrimary`, `textSecondary`, `textDanger`, `textSuccess`, `textWarning`
- Text transforms: `textCapitalize`

### Spacing

Use spacing utilities for consistent margins and padding:

```javascript
import { spacing } from '../utils/styles';

<View style={[spacing.p4, spacing.mt2, spacing.mb3]}>
  <Text>Content</Text>
</View>
```

**Available Spacing:**
- Padding: `p1`, `p2`, `p3`, `p4`, `ph1`, `ph2`, `ph3`, `ph4`, `pv1`, `pv2`, `pv3`, `pv4`
- Margins: `m1`, `m2`, `m3`, `m4`, `mt1`, `mt2`, `mt3`, `mt4`, `mb1`, `mb2`, `mb3`, `mb4`, `ml1`, `ml2`, `ml3`, `ml4`, `mr1`, `mr2`, `mr3`, `mr4`, `mh1`, `mh2`, `mh3`, `mh4`, `mv1`, `mv2`, `mv3`, `mv4`
- Borders: `bw05`, `bw1`, `br1`, `br2`, `br3`, `br5`

### Layouts

Use layout utilities for common layout patterns:

```javascript
import { layouts } from '../utils/styles';

<View style={layouts.rowCenter}>
  <Text>Centered Row</Text>
</View>

<View style={layouts.rowBetween}>
  <Text>Left</Text>
  <Text>Right</Text>
</View>

<View style={layouts.colCenter}>
  <Text>Centered Column</Text>
</View>
```

**Available Layouts:**
- `rowCenter` - Row with center alignment
- `rowBetween` - Row with space-between
- `colCenter` - Centered column
- `container` - Fullscreen container (flex: 1)

### Message Styles

Use semantic message styles for status indicators:

```javascript
import { message } from '../utils/styles';

<View style={message.SuccessMessage}>
  <Text>Operation successful!</Text>
</View>

<View style={message.DangerMessage}>
  <Text>Error occurred!</Text>
</View>
```

**Available Message Styles:**
- `DangerMessage` - Error/danger messages
- `SuccessMessage` - Success messages
- `WarningMessage` - Warning messages
- Individual containers: `dangerContainer`, `successContainer`, `warningContainer`

### Global Styles Object

The `styles` object contains commonly used component styles:

```javascript
import { styles } from '../utils/styles';

<View style={styles.container}>
  <Text style={styles.title}>Title</Text>
  <TouchableOpacity style={styles.buttonPrimary}>
    <Text style={styles.buttonTextPrimary}>Button</Text>
  </TouchableOpacity>
</View>
```

**Common Global Styles:**
- `container` - Main container (flex: 1, backgroundColor: PureWhite)
- `buttonPrimary` - Primary button style
- `buttonTextPrimary` - Primary button text
- `title` - Standard title text
- `ticketCard` - Ticket card container
- `ticketCardHeader` - Ticket header
- `ticketCardFooter` - Ticket footer
- And many more...

## Best Practices

1. **Always use centralized styles** - Avoid creating local `StyleSheet.create()` objects unless absolutely necessary
2. **Combine styles** - Use array syntax to combine multiple styles:
   ```javascript
   <Text style={[typography.font16, typography.textBold, spacing.mt2, { color: PrimaryColor }]}>
   ```
3. **Use semantic names** - Prefer `PrimaryColor` over hardcoded `"#cf413a"`
4. **Extend, don't duplicate** - If you need a variation, extend existing styles rather than duplicating
5. **Keep component-specific styles minimal** - Only create local styles for truly unique component needs

## Examples

### Button Component

```javascript
import { styles, typography, PrimaryColor, WhiteColor, spacing } from '../utils/styles';

<TouchableOpacity style={[styles.buttonPrimary, spacing.p3, spacing.br1]}>
  <Text style={styles.buttonTextPrimary}>Submit</Text>
</TouchableOpacity>
```

### Card Component

```javascript
import { styles, spacing, typography, BlackColor, PureWhite } from '../utils/styles';

<View style={[styles.card, spacing.p3, spacing.mb2]}>
  <Text style={[typography.font18, typography.textBold, { color: BlackColor }]}>
    Card Title
  </Text>
  <Text style={[typography.font14, { color: BlackColor }]}>
    Card content
  </Text>
</View>
```

### Form Input

```javascript
import { styles, spacing, typography, BlackColor, LightGray } from '../utils/styles';

<View style={spacing.mb3}>
  <Text style={[typography.font14, { color: BlackColor, marginBottom: 8 }]}>
    Label
  </Text>
  <TextInput
    style={[styles.inputStyle, spacing.p2, { borderColor: LightGray }]}
    placeholder="Enter text"
  />
</View>
```

### Error Message

```javascript
import { message, typography, spacing } from '../utils/styles';

<View style={[message.DangerMessage, spacing.p3]}>
  <Text style={[typography.font14, { color: 'white' }]}>
    An error occurred. Please try again.
  </Text>
</View>
```

## Migration Guide

If you're migrating from local styles to centralized styles:

1. **Identify local styles** - Find `StyleSheet.create()` in your component
2. **Map to centralized styles** - Match local styles to existing centralized styles
3. **Replace imports** - Update imports to use `utils/styles`
4. **Update style references** - Replace `localStyles.x` with centralized style combinations
5. **Remove local StyleSheet** - Delete the local `StyleSheet.create()` block
6. **Test** - Verify visual appearance matches

## Contributing

When adding new styles:

1. **Check if it exists** - Search existing styles before creating new ones
2. **Use appropriate module** - Add to the correct module (colors, spacing, typography, etc.)
3. **Follow naming conventions** - Use consistent, semantic names
4. **Update this README** - Document new styles in the appropriate section
5. **Export from index** - Ensure new exports are added to `index.js`

## Notes

- The `styles` object in `utils/styles.js` contains legacy styles that are gradually being migrated to the modular system
- Some component-specific styles may remain local if they're truly unique to that component
- Always prefer composition over duplication when creating style variations

