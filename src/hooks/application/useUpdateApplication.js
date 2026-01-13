'use strict';

import { applicationsUrl } from '@/config/endpoints';
import { axiosInstance } from '@/config/axiosConfig';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Hook to update an existing application
 */
export function useUpdateApplication() {
    const queryClient = useQueryClient();
    
    return useMutation(
        ({ applicationId, ...applicationData }) => axiosInstance.patch(
            `${applicationsUrl}${applicationId}/`,
            {
                application_type: applicationData.applicationType,
                position: applicationData.position,
                first_name: applicationData.firstName,
                last_name: applicationData.lastName,
                middle_initial: applicationData.middleInitial,
                affiliation: applicationData.affiliation,
                mili_status: applicationData.miliStatus,
                rank: applicationData.rank,
                grade: applicationData.grade,
                command_unit: applicationData.commandUnit,
                installation: applicationData.installation,
                work_email: applicationData.workEmail,
                has_mil_gov_work_email: applicationData.hasMilGovWorkEmail,
                other_sarc_email: applicationData.otherSarcEmail,
                dsn_code: applicationData.dsnCode,
                work_phone: applicationData.workPhone,
                work_phone_ext: applicationData.workPhoneExt,
                certification_awarded_date: applicationData.certificationAwardedDate,
                certification_expiration_date: applicationData.certificationExpirationDate,
                no_experience_needed: applicationData.noExperienceNeeded,
                supervisor_last_name: applicationData.supervisorLastName,
                supervisor_first_name: applicationData.supervisorFirstName,
                supervisor_email: applicationData.supervisorEmail,
                sarc_last_name: applicationData.sarcLastName,
                sarc_first_name: applicationData.sarcFirstName,
                sarc_email: applicationData.sarcEmail,
                commanding_officer_last_name: applicationData.commandingOfficerLastName,
                commanding_officer_first_name: applicationData.commandingOfficerFirstName,
                commanding_officer_email: applicationData.commandingOfficerEmail,
                co_same_as_supervisor: applicationData.coSameAsSupervisor,
                code_of_ethics_acknowledgement: applicationData.codeOfEthicsAcknowledgement,
                final_submission: applicationData.finalSubmission,
            }
        ).then(res => res.data),
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['application', data.id]);
                queryClient.invalidateQueries(['applications']);
            }
        }
    );
}
