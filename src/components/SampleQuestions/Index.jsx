import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchRandomQuestions } from '../../utils/helpers';

const styles = {
    marign: "0 auto",
    textAlign: "center",
}

export default function SampleQuestions({ task }) {
    const [sampleQuestions, setSampleQuestions] = useState([])

	useEffect(() => {
        fetchRandomQuestions(task)
            .then(setSampleQuestions)
    }, []);

	return (
        <Paper sx={styles} elevation={10}>
            {sampleQuestions.map(q => {
                return <div key={q}>{q}</div>
            })}
        </Paper>
    )
}
