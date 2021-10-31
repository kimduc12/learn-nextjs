import React from 'react';
import useSWR from 'swr';

export interface StudentDetailProps {
    studentId: string;
}

export function StudentDetail({ studentId }: StudentDetailProps) {
    const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
        revalidateOnFocus: false,
        dedupingInterval: 60 * 60 * 1000,
    });
    const handleMutateClick = () => {
        mutate({ name: 'easy frontend' }, true);
    };
    return (
        <div>
            Name: {data?.name || '--'} <button onClick={handleMutateClick}>Mutate</button>
        </div>
    );
}
