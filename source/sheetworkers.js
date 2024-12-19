// Automatically updates the number of d6s based on the selected attribute

const selection = ['roll_virtue'];
const virtues = ['Strength', 'Cunning', 'Courage', 'Beauty', 'Wisdom', 'Prowess'];
const bonusDice = ['public_name', 'invoke', 'tag', 'bonus_dice'];
const negativeDice = ['wager'];

const attrs = [...selection, ...virtues, ...bonusDice, ...negativeDice];
const events = attrs.map((val) => `change:${val}`);

const ON = 'on';

const safeParseInt = (val) => {
    try {
        return parseInt(val)
    } catch (err) {
        return 0;
    }
}

const eventString = events.join(' ');

on(eventString, function() {
    getAttrs(attrs, function(values) {
        console.log(JSON.stringify(values));
        const selectedAttribute = values.roll_virtue;
        const wager = safeParseInt(values.wager);


        if (wager < 0) {
            setAttrs({
                risk_template: `Positive values only for wagers please.`,
                dice_count: 0,
            });
            return;
        }

        const bonusDice = safeParseInt(values.bonus_dice);

        const templateObj = {
            name: 'Risk Roll',
            [selectedAttribute]: parseInt(values[selectedAttribute]),
            ...(values.public_name === ON && { 'Public Name': 1 }),
            ...(values.invoke === ON && { 'Invoke': 3 }),
            ...(values.tag === ON && { 'Tag': 2 }),
            ...(wager && { 'Wager': wager }),
            ...(bonusDice && { 'Bonus Dice': bonusDice }),
        };

        const finalDieCount = Object.entries(templateObj).reduce((acc, [key, value]) => {
            if (!Number.isSafeInteger(value)) {
                return acc;
            }
            if (key === 'Wager') {
                acc -= value;
            } else {
                acc += value;
            }
            return acc;
        }, 0);

        if (finalDieCount < 0) {
            setAttrs({
                risk_template: `You are rolling [${finalDieCount}] dice, maybe lower you wagers?`,
                dice_count: 0,
            });
            return;
        }

        templateObj.Result = `[[${finalDieCount}d6]]`;

        let templateString = '&{template:default}';
        templateString += Object.entries(templateObj).map(([key, value]) => `{{${key}=${value}}}`).join(' ');



        // Set the number of d6s to roll
        setAttrs({
            risk_template: templateString,
            dice_count: finalDieCount,
        });
    });
});

const buttonList = ['concept', 'devotions', 'aspects', 'maneuvers', 'contacts', 'invokes', 'equipment', 'notes'];
buttonList.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            sheetTab: button,
        });
    });
});