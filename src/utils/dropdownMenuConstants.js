'use strict';

export const ALL_STEPS = [
    {name: 'Learning Plans', id: 0},
    {name: 'Create a New Plan', id: 1},
    {name: 'Name Your Plan', id: 2},
    {name: 'Choose a Skill Area', id: 3},
    {name: 'Set Competency Goals', id: 4},
    {name: 'Review & Save', id: 5}
];

export const timeframeOptions = ['Short-term (1-2 years)', 'Long-term (3-4 years)'];
export const proficiencyLevels = ['Basic', 'Intermediate', 'Advanced', 'Mastery'];
export const priorityOptions = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];
export const shortTermGoalTimeLine = [
    '1-3 months',
    '3-6 months',
    '6-9 months',
    '9-12 months',
    '12-18 months',
    '18-24 months'
];

export const longTermGoalTimeLine = [
    '2-2.5 years',
    '2.5-3 years',
    '3-3.5 years',
    '3.5-4 years',
    '4-4.5 years',
    '4.5-5 years'
];

export const resourceSupportOptions = [
    'Formal training courses or certifications',
    'Stretch assignments or special projects',
    'Online learning platforms and resources',
    'External professional networking',
    'Mentorship from senior colleagues',
    'Professional conferences and workshops',
    'Cross-functional team collaborations',
    'Supervisor guidance and support',
    'Other'
];

export const obstacleOptions = [
    'Limited time due to current workload',
    'Limited prior experience in this area',
    'Limited availability of mentors/experts',
    'Prerequisite skills or knowledge gaps',
    'Budget constraints for traning/resources',
    'Competing work priorities and deadlines',
    'Need for additional organizational support',
    'Access to necessary tools or technology',
    'Other'
];

// Mock data for development
// In the future, this data will come from an API
export const ksaOptions = [
    { name: 'Opposing Forces', description: 'In coordination with the Intelligence Community, maintains operational understanding' },
    { name: 'System User', description: 'Understands the user mission/training and how the user will use and operate the DoD systems' },
    { name: 'DoD Systems', description: 'Understands the DoD systems and its mission critical function including but not limited to sub-components' },
];

export const applicationPositionOptions = [
    "SAPR Program Administrator",
    "SAPR VA",
    "SARC",
    "Supervisory SARC",
    "Collateral Duty SARC",
    "Special Assignment SARC",
    "Collateral Duty SAPR VA",
    "Special Assignment SAPR VA"
]

export const payGradeOptions = [
    "E-1",
    "E-2",
    "E-3",
    "E-4",
    "E-5",
    "E-6",
    "E-7",
    "E-8",
    "E-9",
    "W-1",
    "W-2",
    "W-3",
    "W-4",
    "W-5",
    "O-1",
    "O-2",
    "O-3",
    "O-4",
    "O-5",
    "O-6",
    "O-7",
    "O-8",
    "O-9",
    "O-10",
]

export const affiliationOptions = [ 
    "Army",
    "Navy",
    "Air Force",
    "Marine Corps",
    "Coast Guard",
    "DoD Civilian",
    "Other (Contractor, etc)"   
]

export const applicantStatusOptions = [
    "Active Duty",
    "Active Duty Reservist",
    "National Guard",
    "Reserve",
    "Civilian",
    "Contractor"
]

export const rankNavyOptions = [
    "SR",
    "SA",
    "SN",
    "PO3",
    "PO2",
    "PO1",
    "CPO",
    "SCPO",
    "MCPO",
    "CWO2",
    "CWO3",
    "CWO4",
    "CWO5",
    "ENS",
    "LTJG",
    "LT",
    "LCDR",
    "CDR",
    "CAPT",
    "RDML",
    "RADM",
    "VADM",
    "ADM"
]

export const rankArmyOptions = [
    "PVT",
    "PV2",
    "PFC",
    "SPC",
    "CPL",
    "SGT",
    "SSG",
    "SFC",
    "MSG",
    "1SG",
    "SGM",
    "CSM",
    "WO1",
    "CW2",
    "CW3",
    "CW4",
    "CW5",
    "2LT",
    "1LT",
    "CPT",
    "MAJ",
    "LTC",
    "COL",
    "BG",
    "MG"
]

export const rankAirForceOptions = [
    "AB",
    "Amn",
    "A1C",
    "SrA",
    "SSgt",
    "TSgt",
    "MSgt",
    "SMSgt",
    "CMSgt",
    "2nd Lt",
    "1st Lt",
    "Capt",
    "Maj",
    "Lt Col",
    "Col",
    "Brig Gen",
    "Maj Gen",
    "Lt Gen",
    "Gen"
]

export const rankMarineCorpsOptions = [
    "PVT",
    "PFC",
    "LCpl",
    "Cpl",
    "Sgt",
    "SSgt",
    "GySgt",
    "MSgt",
    "1stSgt",
    "MGySgt",
    "SgtMaj",
    "WO",
    "CWO2",
    "CWO3",
    "CWO4",
    "CWO5",
    "2ndLt",
    "1stLt",
    "Capt",
    "Maj",
    "LtCol",
    "Col",
    "BGen",
    "MajGen",
    "LtGen",
    "Gen",
]

export const rankCoastGuardOptions = [
    "Seaman Recruit",
    "Seaman Apprentice",
    "Seaman",
    "PO3",
    "PO2",
    "PO1",
    "CPO",
    "SCPO",
    "MCPO",
    "CWO2",
    "CWO3",
    "CWO4",
    "ENS",
    "LTJG",
    "LT",
    "LCDR",
    "CDR",
    "CAPT",
    "RDML",
    "RADM",
    "VADM",
    "ADM",
]

export const rankCivilianOptions = [
    "GS-1",
    "GS-2",
    "GS-3",
    "GS-4",
    "GS-5",
    "GS-6",
    "GS-7",
    "GS-8",
    "GS-9",
    "GS-10",
    "GS-11", 
    "GS-12",
    "GS-13",
    "GS-14",
    "GS-15"
]