'use strict';

import { applicationExperiencesUrl } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Hook to create a new application experience
 */

export function useCreateApplicationExperience() {
    const queryClient = useQueryClient();
    
    return useMutation(
        (experienceData) => axiosInstance.post(applicationExperiencesUrl, {
            application: experienceData.applicationId,
            display_order: experienceData.displayOrder,
            position_name: experienceData.positionName,
            start_date: experienceData.startDate,
            end_date: experienceData.endDate,
            advocacy_hours: experienceData.advocacyHours,
            marked_for_evaluation: experienceData.markedForEvaluation || false,
            supervisor_last_name: experienceData.supervisorLastName,
            supervisor_first_name: experienceData.supervisorFirstName,
            supervisor_email: experienceData.supervisorEmail,
            supervisor_not_available: experienceData.supervisorNotAvailable || false,
        }).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['application-experiences']);
                queryClient.invalidateQueries(['application', data.application]);
            }
        }
    );
}
