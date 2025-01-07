import { Add } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from '@mui/material'
import AOS from 'aos'
import React, { useEffect } from 'react'

export default function FAQ() {
  useEffect(() => {
    AOS.init({})
  }, [])

  return (
    <>
      <Container maxWidth="xl" data-aos="fade-up" data-aos-duration="2500">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '30px',
            gap: '20px',
            width: '100%',
          }}
        >
          <Typography variant="h2">Frequently Asked Questions</Typography>
          <Accordion
            sx={{ width: '100%' }}
            slotProps={{ heading: { component: 'h4' } }}
          >
            <AccordionSummary
              expandIcon={<Add />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Question One
            </AccordionSummary>
            <AccordionDetails>
              This is an Simple Text You can add here what you want
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ width: '100%' }}
            slotProps={{ heading: { component: 'h4' } }}
          >
            <AccordionSummary
              expandIcon={<Add />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Question tow
            </AccordionSummary>
            <AccordionDetails>
              This is an Simple Text You can add here what you want
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ width: '100%' }}
            slotProps={{ heading: { component: 'h4' } }}
          >
            <AccordionSummary
              expandIcon={<Add />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Question Three
            </AccordionSummary>
            <AccordionDetails>
              This is an Simple Text You can add here what you want
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ width: '100%' }}
            slotProps={{ heading: { component: 'h4' } }}
          >
            <AccordionSummary
              expandIcon={<Add />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Question four
            </AccordionSummary>
            <AccordionDetails>
              This is an Simple Text You can add here what you want
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ width: '100%' }}
            slotProps={{ heading: { component: 'h4' } }}
          >
            <AccordionSummary
              expandIcon={<Add />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Question five
            </AccordionSummary>
            <AccordionDetails>
              This is an Simple Text You can add here what you want
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ width: '100%' }}
            slotProps={{ heading: { component: 'h4' } }}
          >
            <AccordionSummary
              expandIcon={<Add />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Question six
            </AccordionSummary>
            <AccordionDetails>
              This is an Simple Text You can add here what you want
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </>
  )
}
