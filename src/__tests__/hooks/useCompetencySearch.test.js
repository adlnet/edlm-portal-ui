import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@testing-library/react';
import { useCompetencySearch } from '@/hooks/useCompetencySearch';
import {useState} from 'react';
import React, { useEffect, useState as useStateMock} from 'react';
import axios from 'axios';
import competencyData from '@/__mocks__/data/competency.data';
import mockAxios from 'jest-mock-axios';

// const queryClient = new QueryClient();
// const wrapper = ({ children }) => (
//   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// );

// jest.mock('axios')

//jest.unmock('@/hooks/useCompetencySearch');

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(),
    useEffect: jest.fn()
}))
const setState = jest.fn()

describe('useCompetencySearch hook test', () => {

  beforeEach(() => {
    useStateMock.mockImplementation(jest.requireActual('react').useState)
  })

  it ('should return the competency data when successful', async() => {
    mockAxios.request.mockImplementation(competencyData);

    useState.mockImplementation(()=>[{Name: '', Competencies: []}, setState])

    const competencies = useCompetencySearch();
    
    expect (competencies === (competencyData.Competencies))
  })

  it ('should return the backup-competency data when unsuccessful', async() => {
    mockAxios.request.mockRejectedValue(competencyData);

    useState.mockImplementation(()=>[{Name: '', Competencies: []}, setState])

    const competencies = useCompetencySearch();
    
    expect (competencies === (competencyData.Competencies))
  })
  
});