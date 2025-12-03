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

// Converts timeline str to int value in months
export const convertTimelineToInt = timeline => {
    return timelineMap[timeline] || null;
}
