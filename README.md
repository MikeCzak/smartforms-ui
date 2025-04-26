# Optimization Algorithms Included in this Prototype
This repository contains the prototype for the Bachelor thesis "SmartForms UI" by Michael Czak. It features a containerized architecture with a Lit/TypeScript frontend, an Express.js backend, and an Nginx API gateway. The backend serves JSON-based form templates, which the frontend dynamically loads and renders into well-formatted, optimized, and user-friendly forms. The prototype emphasizes usability, validation, and responsive design, leveraging Custom HTML Elements (using Lit) with Material Web Components as a basis for a modern UI and is available for testing at https://smart-ui.mikeczak.com.

The following is a list of rules, both already implemented ([x]) and planned ([ ]), applied to the prototype.

# Note for future implementations
- Read not only json but also XML, SQL-Schema, etc.
- Use LLM for constraint pattern interpretation

# Functional
## Form
### Form Navigation
- [ ] navigate erroneous fields with arrow keys up/down
- [x] deactivate submit button on submission
### Required Fields
- [x] use * and color
### Label Location
- [x] put only above, not floating
### Validation and Feedback
- [x] embedded instant validation
- [ ] mark erroneous fields after submit and provide said navigation
## Elements
### Choices
- [ ] multiple
  - <= 5 options: checkboxes
  - 5 - 15 options:
    - mobile: DL
    - desktop: LB
- [ ] single
  - 1 option:
    - immediate effect (show/hide section): toggle
    - effect after submit: checkbox
  - <= 5 options: radio buttons
  - 5 - 15 options:
    - has default value: DL
    - no default value:
      - mobile: DL
      - desktop: LB
- [ ] both
  - \> 15 options: Dropdown with search field (text input)
### Date entry
- [ ] dropdown for required
- [ ] text with format indication below for non-required

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
- [ ] chunk long numbers
# Additional Guidelines
- [x] don't clear fields on erroneous submit
---
---
&nbsp;

> ## TODOS
> ### Necessary Metadata:
> - section titles
> - min, max, minlength, maxlength
> - include range input(s)
> - regex pattern for specific format restrictions
> - chunk size for long number fields
>
> ### Inform User on Landing Page About
> - erroneous form navigation
> - provided personal data
>
> ### Helpers
> - ~~generate unique id from label for html id~~
> - visitor for "fields exist that depend on this field" for toggle decision (maybe array is enough since dependsOn is in the interface)
> - invalidIterator for post-submit navigation