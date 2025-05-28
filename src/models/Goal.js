class Goal {
    constructor({ title, specific, measurable, achievable, relevant, timebound }) {
        this.title = title;
        this.specific = specific;
        this.measurable = measurable;
        this.achievable = achievable;
        this.relevant = relevant;
        this.timebound = timebound;
    }

    // Optional: Add a validation method
    isValid() {
        return (
            typeof this.title === 'string' &&
            typeof this.specific === 'string' &&
            typeof this.measurable === 'string' &&
            typeof this.achievable === 'string' &&
            typeof this.relevant === 'string' &&
            typeof this.timebound === 'string'
        );
    }
}

export default Goal;
