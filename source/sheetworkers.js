// Automatically updates the number of d6s based on the selected attribute
on("change:roll_virtue change:Strength change:Cunning change:Courage change:Beauty change:Wisdom change:Prowess", function() {
    console.log("Sheet Worker triggered");
    getAttrs(["roll_virtue", "Strength", "Cunning", "Courage", "Beauty", "Wisdom", "Prowess"], function(values) {
        let selectedAttribute = values.roll_virtue;
        let numberOfDice = 0;

        switch (selectedAttribute) {
            case "Strength":
                numberOfDice = parseInt(values.Strength) || 0;
                break;
            // case "dexterity":
            default:
                numberOfDice = parseInt(values.Cunning) + parseInt(values.Strength) || 0;
                break;
            // case "constitution":
            //     numberOfDice = parseInt(values.constitution) || 0;
            //     break;
        }

        // Set the number of d6s to roll
        setAttrs({
            num_of_d6: numberOfDice,
        });
    });
});

const buttonList = ["concept", "devotions", "aspects", "maneuvers", "contacts", "invokes", "equipment", "notes"];
buttonList.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            sheetTab: button,
        });
    });
});