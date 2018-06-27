import { Toggle, IToggleState } from './toggle';

let toggle: Toggle;
const initalStateGood: IToggleState = {
  value: 'intial value',
  selected: false
};
const initalStateBad: IToggleState = {
  selected: false
};

describe('Happy Path: ', () => {
  beforeEach(() => {
    toggle = new Toggle(initalStateGood);
  });

  test('allows get access to internal state via instance.state', () => {
    expect(toggle.state).toEqual(initalStateGood);
  });

  test('allows get access to internal state value via instance.value', () => {
    expect(toggle.value).toEqual(initalStateGood.value);
  });

  test('allows get access to internal selected value via instance.selected', () => {
    expect(toggle.selected).toEqual(initalStateGood.selected);
  });

  test('emits an event with a new state object when instance.state is set', (done) => {
    const newState: IToggleState = {
      value: 'new value',
      selected: true
    };

    toggle.onToggle.subscribe((state: IToggleState) => {
      expect(state).toEqual(newState);
      done();
    });

    toggle.state = newState;
  });

  test('emits an event with a state of selected = TRUE when selected is set to TRUE', (done) => {
    toggle.onToggle.subscribe((state: IToggleState) => {
      expect(state.selected).toEqual(true);
      done();
    });

    toggle.selected = true;
  });

  test('emits an event with a state of selected = FALSE when selected is set to FALSE', (done) => {
    toggle.onToggle.subscribe((state: IToggleState) => {
      expect(state.selected).toEqual(false);
      done();
    });

    toggle.selected = false;
  });

  test('emits an event with a updated value when the state value is modified', (done) => {
    const newValue = 'new value';

    toggle.onToggle.subscribe((state: IToggleState) => {
      expect(state.value).toEqual(newValue);
      done();
    });

    //trigger a state change
    toggle.value = newValue;
  });

  test('emits an event with the state.selected value switched when instance.toggle is called', (done) => {
    toggle.onToggle.subscribe((state: IToggleState) => {
      expect(state.selected).toEqual(true);
      done();
    });

    //trigger a state change
    toggle.toggle();
  });
});

describe('Bad Path ', () => {
  test('Bad Constructor Initalization', () => {
    expect(() => new Toggle(initalStateBad)).toThrowError('Expected object');
  });
});

describe('Bad Path - Bad value when ', () => {
  beforeEach(() => {
    toggle = new Toggle(initalStateGood);
  });

  test('setting .state', () => {
    expect(() => {
      toggle.state = initalStateBad;
    }).toThrowError('Expected object');
  });

  test('setting .selected', () => {
    expect(() => {
      toggle.selected = '0';
    }).toThrowError('Expected boolean');
  });
});
