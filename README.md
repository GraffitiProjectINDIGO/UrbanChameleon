# Urban Chameleon

Welcome to the repository of Urban Chameleon, an online platform conceptualised for the analysis and visualisation of graffiti and the graffiti-scape at the Donaukanal in Vienna, Austria. This endeavour is a constituent of the broader initiative, Project INDIGO.

![Urban Chameleon Logo](public\images\Chameleon.png)

## Table of Contents

- [Urban Chameleon](#urban-chameleon)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Functionalities](#functionalities)
  - [Installation Procedure](#installation-procedure)
  - [Components](#components)
    - [Resium Component Details](#resium-component-details)
    - [ThemeSwitcher Component Details](#themeswitcher-component-details)
  - [Contribution](#contribution)
  - [Licensing](#licensing)

## Overview

The Urban Chameleon platform affords users a distinctive perspective on the graffiti in Vienna's Donaukanal. Constructed utilising Next.js and TypeScript and integrated with the Resium library, the platform offers a sophisticated user experience. For a comprehensive exploration and further details, kindly visit our official website [urbanchameleon.eu](https://urbanchameleon.eu).

## Functionalities

- **Interactive Graffiti Viewer**: Delve into the graffiti-scape of Donaukanal with our viewer, underpinned by Resium.
- **Dynamic Theme Switcher**: Personalise your visual experience with our toggle feature, facilitating both light and dark mode.
- **Adaptive Design**: Conceived for an array of devices, both desktop and mobile.

## Installation Procedure

1. Duplicate the repository:
   ```bash
   git clone https://github.com/your_username/urban-chameleon.git
   ```
2. Navigate to the project directory:

```bash
cd urban-chameleon
```

3. Install the requisite dependencies using pnpm:

```bash
pnpm install
```

4. Alternatively, should you prefer utilising yarn:

```bash
yarn install
```

5. Construct the application:

```bash
Copy codepnpm build
```

6. Activate the application:

```bash
pnpm run dev
```

7. Utilisation
   Access the application via http://localhost:3000 in your web browser.

## Components

- **Resium:** An interactive viewer purposed for the display of graffiti data.
- **ThemeSwitcher:** A toggle mechanism for the alteration of the application's theme between light and dark modes.

### Resium Component Details

- Exhibits graffiti located at the Donaukanal in Vienna.
- Employs the resium library, a React wrapper for the cesium library.
  View Code

### ThemeSwitcher Component Details

- Offers a toggle mechanism for theme personalisation.
- Employs the next-themes library for theme management.
  View Code

## Contribution

Contributions are heartily welcomed. Should you wish to contribute, kindly adhere to our contribution guidelines.

## Licensing

Content on this website is licensed under CC BY-SA 4.0.
