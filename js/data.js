
let inventory = [];
let commands = ["go", "pickup", "search", "use", "say"];
// commands: buy / sell, lie / tell, (fight / run / hide), inventory
// при наведении на некоторые фразы должен показываться перевод

let nothingHere = "<p>There is nothing here!</p>";

var rooms = {
    "grove": {
        "description": "You are in a grove and you see a light to the <strong>north</strong>\
     and you hear the sound of running water to the <strong>west</strong>.",
        "directions": {
            "north": "clearing",
            "west": "bridge"
        },
        "items": {
          "description": "You see a piece of sheet on the ground. There is a phrase: \"in ascending order\". You found a <strong>phrase: \"in ascending order\"</strong>.",
          "item": "phrase: \"in ascending order\""
        },
        onMap: [2, 1]
    },
    "clearing": {
        "description": "You arrive to a clearing, you see a sea cost to the <strong>north</strong>\
     and there is a pleasent smell coming from the <strong>east</strong>. There is a grove to the <strong>south</strong>.",
        "directions": {
            "south": "grove",
            "north": "sailor",
            "east": "garden"
        },
        onMap: [1, 1]
    },
    "sailor": {
        "description": "You are on the sea coast. There is a clearing to the <strong>south</strong>. You see a boat and a sailor near it. The sailor can take you back home if you tell him the password. \
          You can <strong>say</strong> the password if you know it.",
        "directions": {
            "south": "clearing"
        },
        onMap: [0, 1]
        // "npcs": {
        //   "old lady": "The old lady emits a strange noise and attacks you."
        // }
    },
    "garden": {
        "description": "You arrive at the garden. You can feel the breeze coming from the <strong>north</strong>. \
     You can also see a house on the <strong>south</strong>. There is a clearing to the <strong>west</strong>.",
        "directions": {
            "west": "clearing",
            "north": "coast",
            "south": "house"
        },
        "items": {
          "description": "You see a black cylinder on the ground. You found a <strong>flashlight</strong>.",
          "item": "flashlight"
        },
        onMap: [1, 2]
    },
    "coast": {
        "description": "You are on a sea coast. There is no way further. There is a garden to the <strong>south</strong>.",
        "directions": {
            "south": "garden"
        },
        "items": {
          "description": "You see a piece of sheet on the ground. There are two numbers: 26. You found a <strong>part of the code</strong>.",
          "item": "code part: 26"
        },
        onMap: [0, 2]
    },
    "house": {
        "description": "You found a house but the door is locked. You need a key to enter the house. There is a garden to the <strong>north</strong>.",
        "directions": {
            "north": "garden"
        },
        onMap: [2, 2]
    },
    "houseOpen": {
        "description": "You entered the house. There is only one room there. There is no way further. There is a garden to the <strong>north</strong>.",
        "directions": {
            "north": "garden"
        },
        "items": {
          "description": "You see a piece of sheet on the floor. There are two numbers: 19. You found a <strong>part of the code</strong>.",
          "item": "code part: 19"
        },
        onMap: [2, 2]
    },
    "bridge": {
        "description": "You are near the bridge across the river. You see a building to the <strong>north</strong> \
        and a trail to the <strong>south</strong>. There is a grove to the <strong>east</strong>.",
        "directions": {
            "north": "barn",
            "south": "cave",
            "east": "grove"
        },
        onMap: [2, 0]
    },
    "barn": {
        "description": "You are in a barn. There is no way further. There is a bridge to the <strong>south</strong>.",
        "directions": {
            "south": "bridge"
        },
        "items": {
          "description": "You see something shiny on the floor. You found a <strong>key</strong>.",
          "item": "key"
        },
        onMap: [1, 0]
    },
    "cave": {
        "description": "You are in a cave. There is a bridge to the <strong>north</strong>. Its too dark and you can't go futher. If only you had a flashlight.",
        "directions": {
            "north": "bridge"
        },
        onMap: [3, 0]
        // "items": {
        //   "description": "You see a piece of sheet on the ground. There are two numbers: 34. You found a <strong>part of the code</strong>.",
        //   "item": "code part: 34"
        // }
    },
    "caveOpen": {
        "description": "You turn on the flashlight and you see that the cave is small. There is no way further. There is a bridge to the <strong>north</strong>.",
        "directions": {
            "north": "bridge"
        },
        "items": {
          "description": "You see a piece of sheet on the ground. There are two numbers: 34. You found a <strong>part of the code</strong>.",
          "item": "code part: 34"
        },
        onMap: [3, 0]
    },
}
