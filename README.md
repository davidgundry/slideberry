# Slideberry

Slideberry (A combination of 'slide' and 'library') is an open source slides/presentation library for React and Gatsby. It was originally developed for use with Gatsby web apps, for which a [template Gatsby project](https://github.com/davidgundry/slideberry-template) is available. So far, the library has been used for 6 modules, each with their own web app. This library was created with the common functionality that was reused across those modules. The project is under active development.

While most of the library is designed for use with the [template project](https://github.com/davidgundry/slideberry-template), the goal is to provide components that can be imported into any React-based web app. In particular, slides support:

* Auto-scaling content (including text) to fit the size of the slide for responsive design, including on mobile
* Full-screen presentation
* Printing to create accessible documents

This has been primarily developed for my own use, so it is not yet well documented. See the [Slideberry template](https://github.com/davidgundry/slideberry-template) for usage, demonstrating the web-app being used as a presentation platform.

The library documentation is tailored towards understanding the Slideberry library for creating a presentation app. If you want to create a basic web app for creating slides/presentation materials, a good starting point is to use the Slideberry Template Gatsby project. 

## Example Web Apps

Slideberry has been used for 6 courses so far. To see some examples of how it can be used, check out the following: 

* [Mathematics and Problem Solving](https://mathematicsandproblemsolving.netlify.app/)
* [Programming 04](https://programming04.netlify.app/)
* [Learning Neural Networks with Tensorflow Playground](https://neuralnetworkstensorflowplayground.netlify.app/)
* [Slideberry Template](slideberry.netlify.app) (see [the repository](https://github.com/davidgundry/slideberry-template) on GitHub)

## Usage

It is recommended to clone the [template Gatsby project](https://github.com/davidgundry/slideberry-template) and develop from this base. However, if you want to include the library in your own React slides app, there are a few instructions below.

Currently the library is distributed as a Git repository. Include the repository as a Git submodule in your React or Gatsby project.

```bash
git submodule add <repository-url> src/slideberry/
git submodule init
git submodule update
```
