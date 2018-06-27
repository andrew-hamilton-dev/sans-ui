import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';

/**
 * Internal State Interface for Toggle
 *
 * @export
 * @interface IToggleState
 */
export interface IToggleState {
  /**
   * The reference to the data the togglestate is being associated with
   */
  value: any;

  /**
   * The internal binary state of the instances toggle
   */
  selected: boolean;
}

/**
 * A wrapper to attach a binary state tracker to a value
 *
 * @export
 * @class Toggle
 */
export class Toggle {
  /**
   * Internal event dispatcher to communicate state changes.
   * Leverages SimpleEventDispatcher from https:// github.com/KeesCBakker/Strongly-Typed-Events-for-TypeScript
   *
   * @private
   * @memberof Toggle
   */
  private onToggleStateChange = new SimpleEventDispatcher<IToggleState>();

  /**
   * Manage the state of the Toggle
   *
   * @private
   * @type {IToggleState}
   * @memberof Toggle
   */
  private toggleState: IToggleState = { selected: false, value: {} };

  /**
   * Creates an instance of Toggle.
   * @param {IToggleState} initalState
   * @memberof Toggle
   */
  public constructor(initalState: IToggleState) {
    if (!this.isToggleState(initalState)) {
      throw this.throwStateError(initalState);
    }
    this.toggleState = initalState;
    this.dispatch();
  }

  /**
   * Setter to apply a new toggleState and trigger the state change event
   *
   * @param {IToggleState} toggleState
   * @memberof Toggle
   */
  public set state(toggleState: IToggleState) {
    if (!this.isToggleState(toggleState)) {
      throw this.throwStateError(toggleState);
    }
    this.toggleState = toggleState;
    this.dispatch();
  }

  /**
   * Getter for the instances internal toggleState
   *
   * @type {IToggleState}
   * @memberof Toggle
   */
  public get state(): IToggleState {
    return this.toggleState;
  }

  /**
   * Setter to apply a new value to to the internal toggleState value property and trigger the state change event
   *
   * @param {*} value
   * @memberof Toggle
   */
  public set value(value: any) {
    this.toggleState.value = value;
    this.dispatch();
  }

  /**
   * Getter for the internal toggleState value property
   *
   * @type {*}
   * @memberof Toggle
   */
  public get value(): any {
    return this.toggleState.value;
  }

  /**
   * Setter to apply a boolean to the internal toggleState selected propert and trigger the state change event
   *
   * @param {boolean} selected
   * @memberof Toggle
   */
  public set selected(selected: boolean) {
    if (typeof selected !== 'boolean') {
      throw new Error(`Expected boolean value for toggle.selected, got ${typeof selected}`);
    }
    this.toggleState.selected = selected;
    this.dispatch();
  }

  /**
   * Getter for the internal toggleState selected property
   *
   * @type {boolean}
   * @memberof Toggle
   */
  public get selected(): boolean {
    return this.toggleState.selected;
  }

  /**
   * Allows access to the event dispatcher to allow listeners to be subscribed
   *
   * @memberof Toggle
   * @returns ISimpleEvent<IToggleState>
   *
   */
  public get onToggle(): ISimpleEvent<IToggleState> {
    return this.onToggleStateChange.asEvent();
  }

  /**
   * Inverts the selected value of the toggleState
   *
   * @memberof Toggle
   * @returns Void
   *
   */
  public toggle(): void {
    this.toggleState.selected = !this.toggleState.selected;
    this.dispatch();
  }

  /**
   * Triggers the toggleStateChange event dispatcher to fire off the internal toggleState
   *
   * @private
   * @memberof Toggle
   */
  private dispatch() {
    this.onToggleStateChange.dispatch(this.toggleState);
  }

  /**
   * Helper method to ensure any state object passed into the Toggle is properly formed
   *
   * @private
   * @param {*} state
   * @returns {state is IToggleState}
   * @memberof Toggle
   */
  private isToggleState(state: any): state is IToggleState {
    return state.value !== undefined && typeof state.selected === 'boolean';
  }

  /**
   * Generate an error describing a malformed toggleState object.
   *
   * @private
   * @param {IToggleState} toggleState
   * @returns
   * @memberof Toggle
   */
  private throwStateError(toggleState: IToggleState) {
    return new Error(
      `Expected object matching { selected: boolean, value: any }, got ${JSON.stringify(
        toggleState
      )}`
    );
  }
}
