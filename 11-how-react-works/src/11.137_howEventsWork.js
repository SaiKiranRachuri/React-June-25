//// Event Propagation and Delegation: Refer theory slides

//// Capturing Phase (onClickCapture)
// If an event is triggered by an element at some child the event propagates from the root element to find the target element in Capturing Phase.

//// Target Element

//// Bubbling Phase
// Event hanlders by default listen to events at target element and also the elements during the BUbbling Phase. When there are abrupt results due to this behavior we use e.stopPropagation() to stop the propagation.

//// Event Delegation
// Handling events in central one single parent element for better performance and reduce the code as it needs only one hanlder function.
// Steps:
// 1) Add handler to the parent
// 2) Search for the target element
// 3) If target is one of the buttons then handle the event

//// Synthetic Events: e
// 1) PointerEvent
// 2) MouseEvent
// 3) KeyboardEvent
