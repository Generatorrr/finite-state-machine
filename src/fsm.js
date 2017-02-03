class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {

        this.stateS = config.states;
        this.state = this.initial = config.initial;
        this.history = [];
        this.undoHistory = [];

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {

        return this.state;

    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        if (this.stateS[state]) {
            this.history.push(this.state);
            this.state = state;            
        }
        else throw new Error(); 
        this.undoHistory = [];

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {    

        if (this.stateS[this.state].transitions[event]) {
            this.changeState(this.stateS[this.state].transitions[event]);
        }
        else throw new Error();

}

    /**
     * Resets FSM state to initial.
     */
    reset() {

        this.state = this.initial;
        this.clearHistory();

    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

        if (event) {
            let arrayStates = [];
            for (let innerKey in this.stateS)
                if (this.stateS[innerKey].transitions[event]) arrayStates.push(innerKey);
            return arrayStates;
        }
        else {
            return Object.keys(this.stateS);
        }

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {

        if (this.history.length > 0) {
            let prevState = this.history.pop();
            this.undoHistory.push(this.state);
            this.state = prevState;
            return true;
        }

        return false;

    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {

        if (this.undoHistory.length > 0) {
            let prevUndoState = this.undoHistory.pop();
            this.history.push(this.state);
            this.state = prevUndoState;
            return true;
        }
        return false;

}

    /**
     * Clears transition history
     */
    clearHistory() {

        this.history = [];
        this.undoHistory = [];

    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
