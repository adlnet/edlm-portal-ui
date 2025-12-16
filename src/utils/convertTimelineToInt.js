const timelineMap = {
    '1-3 months': 3,
    '3-6 months': 6,
    '6-9 months': 9,
    '9-12 months': 12,
    '12-18 months': 18,
    '18-24 months': 24,
    '2-2.5 years': 30,
    '2.5-3 years': 36,
    '3-3.5 years': 42,
    '3.5-4 years': 48,
    '4-4.5 years': 54,
    '4.5-5 years': 60
};

const reverseTimelineMap = {
    3: '1-3 months',
    6: '3-6 months',
    9: '6-9 months',
    12: '9-12 months',
    18: '12-18 months',
    24: '18-24 months',
    30: '2-2.5 years',
    36: '2.5-3 years',
    42: '3-3.5 years',
    48: '3.5-4 years',
    54: '4-4.5 years',
    60: '4.5-5 years'
};

// Converts timeline str to int value in months
export const convertTimelineToInt = timeline => {
    return timelineMap[timeline] || null;
}

// Converts int value in months to timeline str
export const convertIntToTimeline = months => {
    return reverseTimelineMap[months] || null;
}
