
//this should match the list of keys in the DATAMAP object below
//we've defined this list to guarantee an order when needed
const DATAMAP_KEYS_ORDERED = [
    "score_age",
    "risk_depression",
    "risk_anxiety",
    "risk_coa",
    "risk_aa",
    "risk_pain",
    "admitted",
    "score_approachAdmitted",
    "score_currentlyUsing",
    "score_approachDischarge",
]

const DATAMAP = {
    "score_age": {
        "text":"Age",
        "name":"score_age",
        "inputs": [
            {
                "id":"age0",
                "value":"5",
                "text":"&le;20"
            },
            {
                "id":"age1",
                "value":"4",
                "text":"20-39"
            },
            {
                "id":"age2",
                "value":"3",
                "text":"40-59"
            },
            {
                "id":"age3",
                "value":"2",
                "text":"60-79"
            },
            {
                "id":"age4",
                "value":"1",
                "text":"&ge;80"
            },
    
        ]
    },
    "risk_depression": {
        "text":"History of Depression",
        "name":"risk_depression",
        "inputs": [
            {
                "id":"depression0",
                "value":"0",
                "text":"No"
            },
            {
                "id":"depression1",
                "value":"1",
                "text":"Yes"
            },
        ]
    },
    "risk_anxiety": {
        "text":"History of Anxiety",
        "name":"risk_anxiety",
        "inputs": [
            {
                "id":"anxiety0",
                "value":"0",
                "text":"No"
            },
            {
                "id":"anxiety1",
                "value":"1",
                "text":"Yes"
            },
        ]
    },
    "risk_coa": {
        "text":"History of Chronic Opioid Abuse",
        "name":"risk_coa",
        "inputs": [
            {
                "id":"coa0",
                "value":"0",
                "text":"No"
            },
            {
                "id":"coa1",
                "value":"1",
                "text":"Yes"
            },
        ]
    },
    "risk_aa": {
        "text":"History of Alcohol Abuse",
        "name":"risk_aa",
        "inputs": [
            {
                "id":"aa0",
                "value":"0",
                "text":"No"
            },
            {
                "id":"aa1",
                "value":"1",
                "text":"Yes"
            },
        ]
    },
    "risk_pain": {
        "text":"History of Chronic Pain",
        "name":"risk_pain",
        "inputs": [
            {
                "id":"pain0",
                "value":"0",
                "text":"No"
            },
            {
                "id":"pain1",
                "value":"1",
                "text":"Yes"
            },
        ]
    },
    "admitted": {
        "text":"Admitted Patient",
        "name":"admitted",
        "inputs": [
            {
                "id":"admitted0",
                "value":"false",
                "text":"No"
            },
            {
                "id":"admitted1",
                "value":"true",
                "text":"Yes"
            },
        ]
    },
    "score_approachAdmitted": {
        "text":"Surgical Approach (Admitted)",
        "name":"score_approachAdmitted",
        "inputs": [
            {
                "id":"approach0",
                "value":"3",
                "text":"Laparotomy"
            },
            {
                "id":"approach1",
                "value":"-2",
                "text":"Minimally Invasive"
            },
        ]
    },
    "score_currentlyUsing": {
        "text":"Patients using more than 6 oxycodone pills (45 morphine equivalents) in the last 24 hours prior to discharge",
        "name":"score_currentlyUsing",
        "inputs": [
            {
                "id":"appadmitted0",
                "value":"0",
                "text":"No"
            },
            {
                "id":"appadmitted1",
                "value":"3",
                "text":"Yes"
            },
        ]
    },
    "score_approachDischarge": {
        "text":"Surgical Approach (For same-day discharge)",
        "name":"score_approachDischarge",
        "inputs": [
            {
                "id":"approach2",
                "value":"-3",
                "text":"Minor MIS Procedure"
            },
            {
                "id":"approach3",
                "value":"0",
                "text":"Minimally Invasive"
            },
        ]
    }
    
        
}
