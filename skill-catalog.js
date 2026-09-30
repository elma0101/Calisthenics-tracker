/* Forma movement catalog. Tracking choices are not a prescribed training sequence. */
(function (root) {
  'use strict';
  const catalog = {
  "sources": {
    "nordic": {"label":"Hybrid Calisthenics — hamstring exercises", "url":"https://www.hybridcalisthenics.com/hamstrings-exercises"},
    "gymfit": {
      "label": "GymFit exercise library",
      "url": "https://www.gymnasticbodies.com/exercises"
    },
    "gmb": {
      "label": "GMB — movement development",
      "url": "https://gmb.io/progressions/"
    },
    "legs": {
      "label": "GMB — single-leg strength",
      "url": "https://show.gmb.io/7120/episodes/4697960-single-leg-strength-exercise"
    },
    "splits": {
      "label": "GMB — splits and pancake",
      "url": "https://gmb.io/splits/"
    },
    "press": {
      "label": "Handstand Factory — press to handstand",
      "url": "https://handstandfactory.com/press/"
    },
    "oneArm": {
      "label": "Handstand Factory — one-arm handstand",
      "url": "https://handstandfactory.com/push-harder/"
    },
    "archer": {
      "label": "Calisthenics.com — archer and typewriter pulls",
      "url": "https://calisthenics.com/exercise/archer-pull-up/"
    },
    "manna": {
      "label": "Calisthenics.com — manna",
      "url": "https://calisthenics.com/exercise/manna/"
    },
    "sissy": {
      "label": "Calisthenics.com — sissy squat",
      "url": "https://calisthenics.com/exercise/sissy-squat/"
    },
    "skills": {
      "label": "Calisthenics.com — skill library",
      "url": "https://calisthenics.com/workout-type/skill/"
    },
    "rings": {
      "label": "FIG — gymnastics element catalog (2025–2028)",
      "url": "https://www.gymnastics.sport/publicdir/rules/files/en_1.1%20-%20MAG%20CoP%202025-2028.pdf"
    },
    "freestyle": {
      "label": "Street Workout Austria — 2026 skill categories",
      "url": "https://www.streetworkoutaustria.at/en/registration?cid=1156&file=files/swa/downloads/2026/REGULATIONS+V.2.1+-+SWA+Calisthenics+Championships+2026.pdf"
    }
  },
  "existing": {
    "handstand": {
      "level": "Developing",
      "sources": [
        "gmb"
      ],
      "aliases": [
        "HS"
      ]
    },
    "front-lever": {
      "level": "Advanced",
      "sources": [
        "rings"
      ],
      "aliases": [
        "FL"
      ]
    },
    "planche": {
      "level": "Specialist",
      "sources": [
        "gymfit"
      ]
    },
    "l-sit": {
      "level": "Developing",
      "sources": [
        "gmb"
      ]
    },
    "back-lever": {
      "level": "Advanced",
      "sources": [
        "rings"
      ]
    },
    "muscle-up": {
      "level": "Advanced",
      "sources": [
        "skills"
      ],
      "aliases": [
        "ring muscle-up",
        "bar muscle-up"
      ]
    },
    "human-flag": {
      "level": "Advanced",
      "sources": [
        "skills"
      ]
    },
    "elbow-lever": {
      "level": "Developing",
      "sources": [
        "gmb"
      ]
    },
    "dragon-flag": {
      "level": "Advanced",
      "sources": [
        "skills"
      ]
    },
    "pistol-squat": {
      "level": "Developing",
      "sources": [
        "legs"
      ]
    },
    "handstand-push-up": {
      "level": "Advanced",
      "sources": [
        "gymfit"
      ],
      "aliases": [
        "HSPU"
      ]
    },
    "one-arm-pull-up": {
      "level": "Specialist",
      "sources": [
        "skills"
      ],
      "aliases": [
        "OAP"
      ]
    },
    "skin-the-cat": {
      "level": "Developing",
      "sources": [
        "gymfit"
      ]
    }
  },
  "additions": [
    {
      "id": "chin-up",
      "name": "Chin-up",
      "category": "Pull",
      "level": "Foundation",
      "unit": "reps",
      "equipment": "Bar",
      "variations": [
        "Feet assisted",
        "Band assisted",
        "Negative",
        "Strict",
        "Paused"
      ],
      "description": "Build vertical pulling control with an underhand grip.",
      "foundation": true,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Strict chin-up",
        "alt": "Athlete at the top of an underhand chin-up, palms facing toward him, chin above the bar, elbows bent and tucked, legs together beneath him."
      }
    },
    {
      "id": "inverted-row",
      "name": "Inverted row",
      "category": "Pull",
      "level": "Foundation",
      "unit": "reps",
      "equipment": "Low bar / rings",
      "variations": [
        "High bar",
        "Bent knees",
        "Straight legs",
        "Feet elevated",
        "Rings"
      ],
      "description": "Practice a horizontal pull with your feet supporting part of your weight.",
      "foundation": true,
      "sources": [
        "gymfit"
      ],
      "aliases": [
        "Australian pull-up",
        "bodyweight row",
        "ring row"
      ],
      "trackingNote": "",
      "art": {
        "pose": "Straight-leg bar row",
        "alt": "Athlete beneath a waist-height horizontal bar doing an inverted row, chest close to the bar, arms bent, straight body diagonal with heels grounded, looking upward."
      }
    },
    {
      "id": "dead-hang",
      "name": "Dead hang",
      "category": "Pull",
      "level": "Foundation",
      "unit": "sec",
      "equipment": "Bar",
      "variations": [
        "Feet assisted",
        "Two hands",
        "Active hang",
        "One hand assisted",
        "One hand"
      ],
      "description": "Build grip capacity and familiarity with hanging positions.",
      "foundation": true,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Two-hand hang",
        "alt": "Athlete hanging vertically from a high pull-up bar with both arms straight overhead, legs together, feet clearly off the floor."
      }
    },
    {
      "id": "plank",
      "name": "Plank",
      "category": "Core",
      "level": "Foundation",
      "unit": "sec",
      "equipment": "Floor",
      "variations": [
        "Knees down",
        "Forearms",
        "Straight arms",
        "Long lever"
      ],
      "description": "Develop a steady trunk position while supported on your arms and toes.",
      "foundation": true,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Forearm plank",
        "alt": "Athlete in a low forearm plank, both forearms and toes grounded, elbows directly beneath shoulders, legs and torso forming one straight diagonal line."
      }
    },
    {
      "id": "side-plank",
      "name": "Side plank",
      "category": "Core",
      "level": "Foundation",
      "unit": "sec",
      "equipment": "Floor",
      "variations": [
        "Bent knees",
        "Staggered feet",
        "Stacked feet",
        "Top leg raised"
      ],
      "description": "Practice lateral trunk stability in a side-supported hold.",
      "foundation": true,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "Record each side as a separate effort and identify left or right in session notes.",
      "art": {
        "pose": "Stacked-feet hold",
        "alt": "Athlete in a side plank facing the viewer in three-quarter view, lower forearm firmly grounded beneath shoulder, hips lifted, legs straight and feet stacked, upper hand on hip."
      }
    },
    {
      "id": "bodyweight-squat",
      "name": "Bodyweight squat",
      "category": "Legs",
      "level": "Foundation",
      "unit": "reps",
      "equipment": "Floor / support",
      "variations": [
        "Supported",
        "Box squat",
        "Full squat",
        "Paused",
        "Tempo"
      ],
      "description": "Build two-leg squat control before exploring more demanding leg skills.",
      "foundation": true,
      "sources": [
        "gymfit"
      ],
      "aliases": [
        "air squat"
      ],
      "trackingNote": "",
      "art": {
        "pose": "Full squat",
        "alt": "Athlete at the bottom of a bodyweight squat, both heels on the floor, knees bent, hips low, torso upright, arms reaching forward for balance."
      }
    },
    {
      "id": "headstand",
      "name": "Headstand",
      "category": "Balance",
      "level": "Developing",
      "unit": "sec",
      "equipment": "Floor / wall",
      "variations": [
        "Supported tuck",
        "Tripod tuck",
        "Wall supported",
        "Freestanding"
      ],
      "description": "Explore an inverted balance with the head and arms forming the support.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "Track controlled balance time. This is a separate balance skill, not a required step toward handstands.",
      "art": {
        "pose": "Tripod headstand",
        "alt": "Athlete in a tripod headstand on a thin mat, crown of head and two palms forming a triangular base, elbows bent about 90 degrees, torso and both straight legs stacked vertically overhead."
      }
    },
    {
      "id": "forearm-stand",
      "name": "Forearm stand",
      "category": "Balance",
      "level": "Advanced",
      "unit": "sec",
      "equipment": "Floor / wall",
      "variations": [
        "Wall supported",
        "Split legs",
        "Legs together"
      ],
      "description": "Balance upside down on the forearms with the head clear of the floor.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Straight forearm stand",
        "alt": "Athlete inverted with both forearms flat and parallel on the floor, elbows shoulder width, head hovering clear of ground, straight torso and straight legs together extending vertically upward."
      }
    },
    {
      "id": "press-handstand",
      "name": "Press to handstand",
      "category": "Balance",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Floor / parallettes",
      "variations": [
        "Feet elevated",
        "Straddle negative",
        "Straddle press",
        "Pike press",
        "L-sit press"
      ],
      "description": "Lift into a handstand with controlled compression and straight-arm support.",
      "foundation": false,
      "sources": [
        "press"
      ],
      "aliases": [
        "press to handstand"
      ],
      "trackingNote": "Count completed presses. Log the entry shape you used; a straddle press and pike press keep separate records.",
      "art": {
        "pose": "Straddle press phase",
        "alt": "Athlete midway through a straight-arm straddle press to handstand, palms on floor and elbows locked, shoulders over hands, hips high above shoulders, both straight legs lifted wide sideways, toes pointed, no foot touching floor."
      }
    },
    {
      "id": "one-arm-handstand",
      "name": "One-arm handstand",
      "category": "Balance",
      "level": "Specialist",
      "unit": "sec",
      "equipment": "Floor / blocks",
      "variations": [
        "Weight shift",
        "Fingertip assisted",
        "Straddle left",
        "Straddle right",
        "Full left",
        "Full right"
      ],
      "description": "Explore specialist hand balancing while transferring support to one arm.",
      "foundation": false,
      "sources": [
        "oneArm"
      ],
      "aliases": [
        "OAHS"
      ],
      "trackingNote": "",
      "art": {
        "pose": "Straddle one-arm balance",
        "alt": "Athlete in a one-arm handstand supported only by the right palm and straight right arm, left arm extended freely sideways, torso inverted and straight legs in a wide balanced straddle overhead."
      }
    },
    {
      "id": "handstand-shoulder-tap",
      "name": "Handstand shoulder taps",
      "category": "Balance",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Floor / wall",
      "variations": [
        "Wall weight shift",
        "Wall shoulder tap",
        "Freestanding shoulder tap"
      ],
      "description": "Practice controlled weight transfers between the hands while inverted.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "Count each completed tap as one rep. Note left/right totals if you track them separately.",
      "art": {
        "pose": "Wall shoulder tap",
        "alt": "Athlete in a wall-supported handstand with one straight arm planted and the other hand touching the opposite shoulder."
      }
    },
    {
      "id": "handstand-walk",
      "name": "Handstand walk",
      "category": "Balance",
      "level": "Advanced",
      "unit": "sec",
      "equipment": "Floor",
      "variations": [
        "Wall lateral travel",
        "Assisted walking",
        "Freestanding walking"
      ],
      "description": "Track continuous, controlled time moving in a handstand.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [
        "hand walking"
      ],
      "trackingNote": "Record continuous walking time in seconds, ending when the feet touch down. Put distance or step count in notes.",
      "art": {
        "pose": "Freestanding walking phase",
        "alt": "Athlete walking on hands, torso inverted, straight legs overhead with a small natural split, one palm grounded beneath shoulder and the other hand lifted a few centimeters taking a step."
      }
    },
    {
      "id": "one-arm-push-up",
      "name": "One-arm push-up",
      "category": "Push",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Floor / raised support",
      "variations": [
        "Incline",
        "Assisted",
        "Wide stance",
        "Narrow stance"
      ],
      "description": "Develop a unilateral press while resisting rotation through the torso.",
      "foundation": false,
      "sources": [
        "skills"
      ],
      "aliases": [],
      "trackingNote": "Log each side separately and identify the working arm in session notes.",
      "art": {
        "pose": "Wide-stance rep",
        "alt": "Athlete near the bottom of a one-arm push-up, right palm planted under chest, right elbow bent, left hand behind lower back, feet spread wide, chest facing floor and whole body straight."
      }
    },
    {
      "id": "pseudo-planche-push-up",
      "name": "Pseudo planche push-up",
      "category": "Push",
      "level": "Developing",
      "unit": "reps",
      "equipment": "Floor / parallettes",
      "variations": [
        "Small lean",
        "Moderate lean",
        "Deep lean",
        "Feet elevated"
      ],
      "description": "Practice a forward-leaning push-up with the feet still supported.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [
        "PPPU"
      ],
      "trackingNote": "",
      "art": {
        "pose": "Forward-leaning rep",
        "alt": "Athlete at the low phase of a pseudo planche push-up, both palms on floor near waist, elbows bent, shoulders well forward of wrists, torso straight and both toes remaining on floor."
      }
    },
    {
      "id": "planche-push-up",
      "name": "Planche push-up",
      "category": "Push",
      "level": "Specialist",
      "unit": "reps",
      "equipment": "Floor / parallettes",
      "variations": [
        "Feet assisted",
        "Tuck",
        "Advanced tuck",
        "Straddle",
        "Full"
      ],
      "description": "Combine planche balance with a controlled bent-arm press.",
      "foundation": false,
      "sources": [
        "freestyle"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Straddle planche rep",
        "alt": "Athlete performing a straddle planche push-up on low parallettes, elbows bent, shoulders forward, body horizontal face down, legs straight in straddle behind, both feet airborne."
      }
    },
    {
      "id": "90-degree-push-up",
      "name": "90-degree push-up",
      "category": "Push",
      "level": "Specialist",
      "unit": "reps",
      "equipment": "Floor / parallettes",
      "variations": [
        "Assisted negative",
        "Negative",
        "Straddle",
        "Full"
      ],
      "description": "Connect a handstand with a horizontal bent-arm position and press back.",
      "foundation": false,
      "sources": [
        "freestyle"
      ],
      "aliases": [
        "90 degree handstand push-up",
        "bent-arm planche push-up"
      ],
      "trackingNote": "One rep is the full handstand-to-horizontal-and-back cycle. Negative-only efforts have a separate variation.",
      "art": {
        "pose": "Horizontal bent-arm phase",
        "alt": "Athlete in the horizontal bottom phase of a 90-degree handstand push-up on parallettes, chest facing floor, elbows bent 90 degrees with upper arms beside torso, straight legs together horizontal and feet off ground, hands below lower ribs."
      }
    },
    {
      "id": "russian-dip",
      "name": "Russian dip",
      "category": "Push",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Parallel bars",
      "variations": [
        "Feet assisted",
        "Forearm transition",
        "Full",
        "Paused"
      ],
      "description": "Practice the transition between forearm support and a dip on parallel bars.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Forearm-support phase",
        "alt": "Athlete resting forearms lengthwise along two parallel bars in the bottom of a Russian dip, hands gripping ahead, elbows behind hands on bars, shoulders low, torso mostly upright and bent legs hanging clear of floor."
      }
    },
    {
      "id": "straight-bar-dip",
      "name": "Straight-bar dip",
      "category": "Push",
      "level": "Developing",
      "unit": "reps",
      "equipment": "Bar",
      "variations": [
        "Feet assisted",
        "Band assisted",
        "Negative",
        "Full"
      ],
      "description": "Build a controlled press above one bar, including the top of a muscle-up.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Bent-arm bar dip",
        "alt": "Athlete above a single waist-height horizontal bar, hands gripping shoulder width, elbows bent behind him, chest leaning over bar, bar in front of lower abdomen, legs dangling together below."
      }
    },
    {
      "id": "archer-pull-up",
      "name": "Archer pull-up",
      "category": "Pull",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Bar",
      "variations": [
        "Feet assisted",
        "Band assisted",
        "Partial",
        "Full"
      ],
      "description": "Pull toward one hand while the other arm provides straighter-arm assistance.",
      "foundation": false,
      "sources": [
        "archer"
      ],
      "aliases": [],
      "trackingNote": "One pull and controlled return is one rep. Record the working side in notes.",
      "art": {
        "pose": "Archer top position",
        "alt": "Athlete at the top of an archer pull-up on a wide bar, chin above bar close to right hand, right elbow deeply bent, left arm fully straight extending sideways to its far grip, both hands clearly on same bar."
      }
    },
    {
      "id": "typewriter-pull-up",
      "name": "Typewriter pull-up",
      "category": "Pull",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Bar",
      "variations": [
        "Feet assisted",
        "Band assisted",
        "Short transfer",
        "Full transfer"
      ],
      "description": "Shift from side to side near the top of a wide-grip pull-up.",
      "foundation": false,
      "sources": [
        "archer"
      ],
      "aliases": [],
      "trackingNote": "One complete left-to-right-and-back transfer is one rep. Keep the same convention across sessions.",
      "art": {
        "pose": "Lateral transfer phase",
        "alt": "Athlete near the top of a wide-grip typewriter pull-up, chin held above bar, body shifted toward left hand, left elbow bent, right arm nearly straight horizontally along bar, legs hanging together."
      }
    },
    {
      "id": "front-lever-pull-up",
      "name": "Front lever pull-up",
      "category": "Pull",
      "level": "Specialist",
      "unit": "reps",
      "equipment": "Bar / rings",
      "variations": [
        "Tuck",
        "Advanced tuck",
        "One leg",
        "Straddle",
        "Full"
      ],
      "description": "Add a horizontal pull while keeping the selected front-lever body shape.",
      "foundation": false,
      "sources": [
        "freestyle"
      ],
      "aliases": [
        "front lever row"
      ],
      "trackingNote": "",
      "art": {
        "pose": "Tuck lever pull-up",
        "alt": "Athlete under a pull-up bar in a tuck front lever pull-up, torso horizontal facing ceiling, knees tucked toward chest, elbows bent pulling lower chest toward bar, back and feet clearly airborne."
      }
    },
    {
      "id": "hefesto",
      "name": "Hefesto",
      "category": "Pull",
      "level": "Specialist",
      "unit": "reps",
      "equipment": "Low bar / rings",
      "variations": [
        "Feet assisted",
        "Assisted negative",
        "Partial",
        "Full"
      ],
      "description": "Track the specialist behind-the-body pull from a deep hang toward support.",
      "foundation": false,
      "sources": [
        "freestyle"
      ],
      "aliases": [
        "hefestos"
      ],
      "trackingNote": "Record the exact assisted or full variation. This specialist shoulder-extension skill benefits from qualified coaching.",
      "art": {
        "pose": "Feet-assisted bar variation",
        "alt": "Athlete practicing a feet-assisted Hefesto with both hands gripping a low bar behind the torso and feet grounded."
      }
    },
    {
      "id": "v-sit",
      "name": "V-sit",
      "category": "Core",
      "level": "Advanced",
      "unit": "sec",
      "equipment": "Floor / parallettes",
      "variations": [
        "Bent knees",
        "One leg",
        "Low V",
        "High V"
      ],
      "description": "Combine straight-arm support with a high, compressed leg position.",
      "foundation": false,
      "sources": [
        "manna"
      ],
      "aliases": [],
      "trackingNote": "Older V-sit efforts saved under L-sit remain there. Use this entry for new dedicated V-sit tracking; records are not moved automatically.",
      "art": {
        "pose": "High V-sit",
        "alt": "Athlete in a V-sit on low parallettes, arms straight beside hips, hips lifted, torso leaning slightly back, legs straight together raised steeply upward forming a narrow V with torso."
      }
    },
    {
      "id": "manna",
      "name": "Manna",
      "category": "Core",
      "level": "Specialist",
      "unit": "sec",
      "equipment": "Floor / parallettes",
      "variations": [
        "Advanced L-sit",
        "Middle split hold",
        "Straddle manna",
        "Full manna"
      ],
      "description": "Explore a high support with the hips lifted forward and shoulders deeply extended.",
      "foundation": false,
      "sources": [
        "manna"
      ],
      "aliases": [],
      "trackingNote": "Manna is a distinct shoulder-extension skill, not simply a higher V-sit. The illustration shows a preparation.",
      "art": {
        "pose": "Middle split preparation",
        "alt": "Athlete in a middle split hold preparation for manna on low parallettes: both straight arms pressing beside and slightly behind hips, shoulders drawn back, hips lifted off floor and forward of hands, legs straight and widely straddled forward, heels airborne."
      }
    },
    {
      "id": "hanging-windshield-wiper",
      "name": "Hanging windshield wipers",
      "category": "Core",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Bar",
      "variations": [
        "Bent knees",
        "Partial straight legs",
        "Full straight legs"
      ],
      "description": "Control side-to-side rotation while hanging with the legs raised.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [
        "windshield wipers"
      ],
      "trackingNote": "Count a full left-right-return cycle as one rep.",
      "art": {
        "pose": "Straight-leg side phase",
        "alt": "Athlete hanging from high bar with straight arms, hips folded and both straight legs together raised toward bar then rotated diagonally to the right side, chest facing viewer, feet near right-hand height."
      }
    },
    {
      "id": "shrimp-squat",
      "name": "Shrimp squat",
      "category": "Legs",
      "level": "Developing",
      "unit": "reps",
      "equipment": "Floor / support",
      "variations": [
        "Assisted",
        "Rear foot free",
        "Rear foot held",
        "Deficit"
      ],
      "description": "Practice a single-leg squat with the free leg folded behind you.",
      "foundation": false,
      "sources": [
        "legs"
      ],
      "aliases": [],
      "trackingNote": "Track each leg separately and note the side.",
      "art": {
        "pose": "Rear-foot-held shrimp",
        "alt": "Athlete in a deep shrimp squat, standing on one foot with knee bent, other knee folded behind hovering just above floor, same-side hand holding rear ankle, free arm extended forward."
      }
    },
    {
      "id": "cossack-squat",
      "name": "Cossack squat",
      "category": "Legs",
      "level": "Developing",
      "unit": "reps",
      "equipment": "Floor / support",
      "variations": [
        "Supported",
        "Partial depth",
        "Full depth",
        "Paused"
      ],
      "description": "Develop side-to-side leg control through a wide lateral squat.",
      "foundation": false,
      "sources": [
        "splits"
      ],
      "aliases": [],
      "trackingNote": "One descent and return on one side is one rep; note left and right separately.",
      "art": {
        "pose": "Full Cossack squat",
        "alt": "Athlete in a deep Cossack squat facing viewer, one knee deeply bent with heel grounded under hip, opposite leg extended straight sideways with heel grounded and toes pointing up, torso upright arms forward."
      }
    },
    {
      "id": "nordic-curl",
      "name": "Nordic curl",
      "category": "Legs",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Knee pad / fixed ankle support",
      "variations": [
        "Hands assisted",
        "Band assisted",
        "Negative",
        "Full"
      ],
      "description": "Practice hamstring control by lowering from the knees with the ankles secured.",
      "foundation": false,
      "sources": [
        "nordic"
      ],
      "aliases": [
        "Nordic hamstring curl"
      ],
      "trackingNote": "Use a secure ankle anchor. Keep assisted, lowering-only, and full-return reps separate.",
      "art": {
        "pose": "Controlled lowering phase",
        "alt": "Athlete performing a Nordic hamstring curl, knees on cushioned mat, ankles securely held under a low fixed padded anchor behind him, body straight from knees to head leaning forward 45 degrees, arms bent with open hands ready in front of chest."
      }
    },
    {
      "id": "sissy-squat",
      "name": "Sissy squat",
      "category": "Legs",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Floor / support",
      "variations": [
        "Supported partial",
        "Supported full",
        "Unassisted",
        "Paused"
      ],
      "description": "Track a knee-dominant squat with an extended hip position.",
      "foundation": false,
      "sources": [
        "sissy"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Supported sissy squat",
        "alt": "Athlete in a supported sissy squat in side view, one hand lightly holding a fixed vertical rail, knees bending forward, heels lifted, torso and thighs forming a straight backward-leaning line, hips extended."
      }
    },
    {
      "id": "dragon-squat",
      "name": "Dragon squat",
      "category": "Legs",
      "level": "Advanced",
      "unit": "reps",
      "equipment": "Floor / support",
      "variations": [
        "Supported",
        "Partial depth",
        "Full",
        "Paused"
      ],
      "description": "Explore a rotational single-leg squat with the free leg crossing behind.",
      "foundation": false,
      "sources": [
        "skills"
      ],
      "aliases": [
        "dragon pistol squat"
      ],
      "trackingNote": "Record each leg separately and note the side.",
      "art": {
        "pose": "Supported dragon squat",
        "alt": "Athlete in a supported dragon squat three-quarter front view, left foot grounded and left knee deeply bent, right leg threaded BEHIND left leg and extended diagonally out to the left side, right foot off floor, one hand lightly on vertical support rail."
      }
    },
    {
      "id": "false-grip-hang",
      "name": "False-grip hang",
      "category": "Rings",
      "level": "Developing",
      "unit": "sec",
      "equipment": "Rings",
      "variations": [
        "Feet assisted",
        "Bent arms",
        "Straight arms"
      ],
      "description": "Practice the wrist-over-ring grip used in ring pulling transitions.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Feet-assisted false grip",
        "alt": "Athlete standing beneath low gymnastic rings in a feet-assisted false-grip hang, knees softly bent and feet on floor, elbows slightly bent overhead, heel of each palm and wrist resting over lower inside edge of wooden ring, hands curled firmly around rings."
      }
    },
    {
      "id": "ring-handstand",
      "name": "Ring handstand",
      "category": "Rings",
      "level": "Specialist",
      "unit": "sec",
      "equipment": "Rings",
      "variations": [
        "Strap supported",
        "Assisted",
        "Freestanding"
      ],
      "description": "Track inverted support on independently moving rings.",
      "foundation": false,
      "sources": [
        "rings"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Strap-supported handstand",
        "alt": "Athlete in an inverted handstand on two low gymnastic rings, hands pressing DOWN into rings, arms straight below inverted shoulders, straight legs pointing vertically up between straps, feet lightly hooked around suspension straps for assistance."
      }
    },
    {
      "id": "iron-cross",
      "name": "Iron cross",
      "category": "Rings",
      "level": "Specialist",
      "unit": "sec",
      "equipment": "Rings",
      "variations": [
        "Feet assisted",
        "Band assisted",
        "Partial cross",
        "Full cross"
      ],
      "description": "Explore a specialist ring hold with both straight arms extended sideways.",
      "foundation": false,
      "sources": [
        "rings"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Full iron cross",
        "alt": "Athlete suspended upright on gymnastic rings in an iron cross, both arms perfectly straight extended horizontally at shoulder height like a T, hands holding wooden rings at ends, straps vertical upward, torso and legs vertical together, feet airborne."
      }
    },
    {
      "id": "maltese",
      "name": "Maltese",
      "category": "Rings",
      "level": "Specialist",
      "unit": "sec",
      "equipment": "Rings",
      "variations": [
        "Feet assisted",
        "Band assisted",
        "Straddle",
        "Full"
      ],
      "description": "Track a face-down horizontal support with wide straight arms near ring height.",
      "foundation": false,
      "sources": [
        "rings"
      ],
      "aliases": [
        "swallow"
      ],
      "trackingNote": "",
      "art": {
        "pose": "Full Maltese on rings",
        "alt": "Athlete in a Maltese cross on rings, whole body straight horizontal face down, arms straight spread widely out and slightly back toward hips, hands pressing into rings at same height as torso, legs together extended behind, entire body airborne. Three-quarter side view."
      }
    },
    {
      "id": "bridge",
      "name": "Bridge",
      "category": "Mobility",
      "level": "Developing",
      "unit": "sec",
      "equipment": "Floor / raised support",
      "variations": [
        "Shoulder bridge",
        "Hands elevated",
        "Full bridge"
      ],
      "description": "Explore supported shoulder and hip extension through a bridge shape.",
      "foundation": false,
      "sources": [
        "gymfit"
      ],
      "aliases": [],
      "trackingNote": "",
      "art": {
        "pose": "Full bridge",
        "alt": "Athlete holding a full gymnast bridge side view, both palms and both feet grounded, elbows straight, hips lifted high, torso forming a smooth arch, head relaxed between upper arms."
      }
    },
    {
      "id": "pancake",
      "name": "Pancake",
      "category": "Mobility",
      "level": "Developing",
      "unit": "sec",
      "equipment": "Floor / blocks",
      "variations": [
        "Elevated seat",
        "Upright straddle",
        "Forward fold",
        "Chest toward floor"
      ],
      "description": "Track a controlled forward fold in a seated straddle.",
      "foundation": false,
      "sources": [
        "splits"
      ],
      "aliases": [],
      "trackingNote": "Log comfortable hold time. Note support height and range; longer time does not by itself mean greater flexibility.",
      "art": {
        "pose": "Seated straddle fold",
        "alt": "Athlete seated in a wide straight-leg straddle, both heels grounded, torso hinging forward between legs with back long, forearms resting on floor ahead, three-quarter front view."
      }
    },
    {
      "id": "front-split",
      "name": "Front split",
      "category": "Mobility",
      "level": "Advanced",
      "unit": "sec",
      "equipment": "Floor / blocks",
      "variations": [
        "Supported left",
        "Supported right",
        "Full left",
        "Full right"
      ],
      "description": "Track your chosen range in a forward-and-back split position.",
      "foundation": false,
      "sources": [
        "splits"
      ],
      "aliases": [],
      "trackingNote": "Keep left and right lead-leg records separate. Note support height and range.",
      "art": {
        "pose": "Supported front split",
        "alt": "Athlete in a front split side view, one straight leg forward and other straight leg backward along floor, pelvis square forward, upright torso, hands on two yoga blocks beside hips, shallow support cushion under pelvis."
      }
    },
    {
      "id": "middle-split",
      "name": "Middle split",
      "category": "Mobility",
      "level": "Advanced",
      "unit": "sec",
      "equipment": "Floor / blocks",
      "variations": [
        "High support",
        "Low support",
        "Full"
      ],
      "description": "Explore a side split while tracking support and available range.",
      "foundation": false,
      "sources": [
        "splits"
      ],
      "aliases": [
        "side split",
        "center split"
      ],
      "trackingNote": "Track comfortable time at a consistent range; note support height and depth.",
      "art": {
        "pose": "Supported middle split",
        "alt": "Athlete in a wide middle split facing viewer, both legs straight extended laterally left and right on floor, pelvis supported on a low bolster, torso upright, hands on yoga blocks in front."
      }
    },
    {
      "id": "bar-swing",
      "name": "Bar swing",
      "category": "Freestyle",
      "level": "Developing",
      "unit": "reps",
      "equipment": "High bar",
      "variations": [
        "Small beat swing",
        "Hollow-arch swing",
        "Controlled larger swing"
      ],
      "description": "Practice a controlled swing cycle while maintaining the grip.",
      "foundation": false,
      "sources": [
        "freestyle"
      ],
      "aliases": [
        "beat swing"
      ],
      "trackingNote": "One forward-and-back swing cycle is one rep.",
      "art": {
        "pose": "Hollow swing phase",
        "alt": "Athlete hanging from a high bar with both hands firmly gripping and arms straight, body swinging forward in a shallow hollow shape, straight legs together angled ahead of the bar, entire body airborne."
      }
    },
    {
      "id": "bar-pullover",
      "name": "Bar pullover",
      "category": "Freestyle",
      "level": "Developing",
      "unit": "reps",
      "equipment": "Bar",
      "variations": [
        "Feet assisted",
        "Tucked",
        "Pike",
        "Straight legs"
      ],
      "description": "Rotate around the bar from a hang into front support.",
      "foundation": false,
      "sources": [
        "freestyle"
      ],
      "aliases": [
        "pull-over"
      ],
      "trackingNote": "",
      "art": {
        "pose": "Hip-over-bar phase",
        "alt": "Athlete in the hip-over-bar phase of a pullover, both hands gripping the horizontal bar, hips contacting the bar and straight legs together passing over it."
      }
    },
    {
      "id": "swing-180",
      "name": "Swing 180",
      "category": "Freestyle",
      "level": "Specialist",
      "unit": "reps",
      "equipment": "High bar / landing mats",
      "variations": [
        "Assisted drill",
        "Half-turn regrasp"
      ],
      "description": "Track half-turn bar-swing catches as a specialist freestyle skill.",
      "foundation": false,
      "sources": [
        "freestyle"
      ],
      "aliases": [
        "bar 180"
      ],
      "trackingNote": "Count completed regrasp repetitions for the selected variation. Release skills belong in a coached setup with suitable landing mats.",
      "art": {
        "pose": "Regrasp after half turn",
        "alt": "Athlete in a two-hand regrasp immediately after a swing half turn on a high bar above thick landing mats, both hands securely back on bar, torso slightly twisted and body diagonally extended in swing, feet airborne."
      }
    },
    {
      "id": "swing-360",
      "name": "Swing 360",
      "category": "Freestyle",
      "level": "Specialist",
      "unit": "reps",
      "equipment": "High bar / landing mats",
      "variations": [
        "Assisted drill",
        "Full-turn regrasp"
      ],
      "description": "Track complete turn-and-catch repetitions in bar freestyle.",
      "foundation": false,
      "sources": [
        "freestyle"
      ],
      "aliases": [
        "bar 360"
      ],
      "trackingNote": "Count completed full-turn regrasp repetitions. The image shows the catch, not the rotation; use a coached setup with suitable landing mats.",
      "art": {
        "pose": "Regrasp after full turn",
        "alt": "Athlete at the secure two-handed catch phase after a full-turn bar swing, hands gripping high bar overhead, arms extended, body airborne diagonally to the side with small residual torso rotation, legs straight together, thick landing mats beneath."
      }
    }
  ]
};
  root.FormaCatalog = catalog;
  if (typeof module !== 'undefined' && module.exports) module.exports = catalog;
})(typeof window !== 'undefined' ? window : globalThis);
