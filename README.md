# Optimization Algorithms Included in this Prototype
This repository contains the prototype for the Bachelor thesis "SmartForms UI" by Michael Czak. It features a containerized architecture with a Lit/TypeScript frontend, an Express.js backend, and an Nginx API gateway. The backend serves JSON-based form templates, which the frontend dynamically loads and renders into well-formatted, optimized, and user-friendly forms. The prototype emphasizes usability, validation, and responsive design, leveraging Custom HTML Elements (using Lit) with Material Web Components as a basis for a modern UI and is available for testing at https://smart-ui.mikeczak.com.

The following is a list of rules, both already implemented ([x]) and planned ([ ]), applied to the prototype.

> Note for future implementations: Read not only json but also XML, SQL-Schema, etc.

# Functional
## Form
### Form Navigation
- [ ] navigate erroneous fields with arrow keys up/down
- [ ] deactivate submit button on submission
### Required Fields
- [ ] use * and color
### Label Location
- [ ] put only above, not floating
### Validation and Feedback
- [ ] embedded instant validation
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
- [ ] state rule and display real-time updated check
# Visual
- [ ] ensure proximity for related choice elements
  - [ ] checkboxes
  - [ ] radio buttons
- [ ] provide common region for sections
- [ ] provide similarity in color for required and erroneous fields
- [ ] large subheadings to disrupt F-shaped reading pattern and re-focus the user's attention
- [ ] chunk long numbers
# Additional Guidelines
- [ ] don't clear fields on erroneous submit
---
---
&nbsp;

> ## TODOS <div style="width: 0;height: 0;border-left: 20px solid transparent;border-right: 20px solid transparent;border-bottom: 32px solid #d13;position: relative; display:inline-block;margin-left:-140px"><div style="width: 0;height: 0;border-left: 14px solid transparent;border-right: 14px solid transparent;border-bottom: 23px solid #eee;position: absolute; display:inline-block; left:-14.5px; top: 6px"><span style="position: absolute; top: 4px; left:-2.5px; color: black; font-weight:bold; font-size: 16px">!</span></div></div>
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

<span style="font-size: 6px; font-style:italic">don't judge me on the warning sign - sometimes my inner monk needs to know how certain things are done</span>