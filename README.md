# Optimization Algorithms Included in this Prototype
This repository contains the prototype for the Bachelor thesis "SmartForms UI" by Michael Czak. It features a containerized architecture with a Lit/TypeScript frontend, an Express.js backend, and an Nginx API gateway. The backend serves JSON-based form templates, which the frontend dynamically loads and renders into well-formatted, optimized, and user-friendly forms. The prototype emphasizes usability, validation, and responsive design, leveraging Custom HTML Elements (using Lit) with Material Web Components as a basis for a modern UI and is available for testing at https://smart-ui.mikeczak.com.

The following is a list of rules, both already implemented ([x]) and planned ([ ]), applied to the prototype.

# Note for future implementations
- Read not only json but also XML, SQL-Schema, etc.
- implement dependsOn logic
- Use LLM for constraint pattern interpretation
- Use LLM for reasonable date ranges depending on label
- Use LLM to determine whether re-ordering required fields breaks logical sequence
- Use LLM to determine a commonly known representation style and invoke a formatter based on that (e.g. uppercase MAC Address)


# Functional
## Form
### Form Navigation
- [x] navigate erroneous fields with arrow keys up/down
- [x] deactivate submit button on submission
### Required Fields
- [x] use * and color
### Label Location
- [x] put only above, not floating
### Validation and Feedback
- [x] embedded instant validation
- [x] mark erroneous fields after submit and provide said navigation
## Elements
### Choices
- [x] multiple
  - <= 5 options: checkboxes
  - 5 - 15 options:
    - mobile: DL
    - desktop: LB
- [x] single
  - 1 option:
    - ~~immediate effect (show/hide section): toggle~~
    - effect after submit: checkbox
  - <= 5 options: radio buttons
  - 6 - 15 options:
    - ~~has default value: DL~~
    - no default value:
      - ~~mobile: DL~~
      - desktop: Searchable Dropdown
- [x] both
  - \> 15 options: Dropdown with search field (text input)
### Date entry
- [x] dropdown for required
- [x] text with format indication below for non-required

> Note: Localization for future implementations
### Format Restrictions
- [x] state rule and display real-time updated check
# Visual
- [x] ensure proximity for related choice elements
  - [x] checkboxes
  - [x] radio buttons
- [x] provide common region for sections
- [x] provide similarity in color for required and erroneous fields
- [x] large subheadings to disrupt F-shaped reading pattern and re-focus the user's attention
- [x] chunk long numbers
# Additional Guidelines
- [x] don't clear fields on erroneous submit
# Further improvement ideas
- [x] don't clear fields on reload (save every input in session storage except password data) and clear after submit
- [x] parse custom chunks/groupings with arbitrary delimiter
- [x] provide a click- and draggable "minimap" with accurate form field position, size and required state for a better overview

---

&nbsp;

> ## TODOS
> ### Necessary Metadata:
> - [x] section titles
> - [x] min, max, minlength, maxlength
> - [ ] ~~include range input(s)~~
> - [x] regex pattern for specific format restrictions
> - [x] chunk size for long data
> - [x] FIX INVALID NAV SHAKING (tab problem)
#### possible chunked data
| Example | Group Length | Format Example |
|-|-|-|
Credit Card Numbers | 4 | 1234 5678 9012 3456
|MAC Addresses | 2 (hex pairs) | 00:1A:2B:3C:4D:5E
IPv4 Addresses | 3-digit max | 192.168.001.001 (optional zero-padding)
Binary strings | 4 or 8 | 1100 1010 1111 0001
Base32 Encoded Strings | 5 | ABCDE FGHIJ KLMNO PQRST
UUIDs | 8-4-4-4-12 (some equal) | 123e4567-e89b-12d3-a456-426614174000
Barcode Data | Depends on spec — but EAN-13 and Code128 often chunk digits for processing |
License Keys (generic) | Often 5 | ABCDE-FGHIJ-KLMNO-PQRST
>
> ### Inform User on Landing Page About
> - [x] erroneous form navigation (added tutorial on first validation)
> - [x] provided personal data
>
> ### Helpers
> - [x] generate unique id from label for html id
> - [ ] ~~visitor for "fields exist that depend on this field" for toggle decision (maybe array is enough since dependsOn is in the interface)~~
> - [x] invalidIterator for post-submit navigation