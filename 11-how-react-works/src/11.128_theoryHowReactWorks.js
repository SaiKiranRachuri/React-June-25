//// RECAP ON HOW REACT WORKS BEHIND THE SCENES

//// TRIGGER
// The whole process of rendering and displaying React application starts with a trigger.
// The trigger can be the INITIAL render of the app or a STATE update in one of the component instances

//// RENDER PHASE
// The above then triggers a render phase which does not produce any visual output
// This phase starts with all the component instances that needs rerender
// Rendering here means calling the function components. This creates one or more updated react elements which are placed in a VIRTUAL DOM.(list of react elements)
// Rendering a component will also cause all of its child components despite there is no change in props because REACT doesn't know if its child had been affected on parent rerendering.

//// RENDER PHASE
//// RECONCILIATION + DIFFLING
// New Virtual DOM needs to be reconciled with current Fiber tree. Which is the representation of element tree before the state update. Because it is slow to destroy entire tree and rebuild when there is a change.
// Reconciliation tries to reuse as much DOM as possible
// This Reconciliation is done using a Reconciler called Fiber which works with a mutable Data Structure called Fiber Tree.
// In the tree for each react element and DOM element there is a fiber that holds actual state, props, queue of work. After reconciliation this queue of work contains the DOM updates for that element.
// The computation is done by comparing the Virtual DOM with current Fiber tree using a Diffing algorithm.
// Updated FIBER TREE and List of DOM updates
// Render phase is asynchronous, it can split work into chunks: pause, prioritize, resume for concurrent features also to prevent JS engine from blockage from constant rerenders.

//// COMMIT PHASE
// In this phase the renderer REACT DOM insert, delete, update DOM elements.
// And will have an updated DOM
// This synchronous unlike Render Phase: done in one to go to keep UI consistent

//// BROWSER PAINT
// Once the browser starts to realises there is an DOM update it starts repaint the browser UI on screen.
