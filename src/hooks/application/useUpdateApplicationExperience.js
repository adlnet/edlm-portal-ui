'use strict';

import { applicationExperiencesUrl } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Hook to update an existing application experience
 */

export function useUpdateApplicationExperience() {
    const queryClient = useQueryClient();
    
    return useMutation(
        ({ experienceId, ...experienceData }) => axiosInstance.patch(
            `${applicationExperiencesUrl}${experienceId}/`,
            {
                display_order: experienceData.displayOrder,
                position_name: experienceData.positionName,
                start_date: experienceData.startDate,
                end_date: experienceData.endDate,
                advocacy_hours: experienceData.advocacyHours,
                marked_for_evaluation: experienceData.markedForEvaluation,
                supervisor_last_name: experienceData.supervisorLastName,
                supervisor_first_name: experienceData.supervisorFirstName,
                supervisor_email: experienceData.supervisorEmail,
                supervisor_not_available: experienceData.supervisorNotAvailable,
            }
        ).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['application-experiences']);
                queryClient.invalidateQueries(['application', data.application]);
            }
        }
    );
}
