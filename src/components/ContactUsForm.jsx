import { Container, Grid, TextField, Typography } from '@mui/material'

export default function ContactUsForm() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ zIndex: '10', position: 'relative', marginY: '50px' }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            sm={12}
            lg={6}
            xs={12}
            xl={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'center',
              gap: '20px',
              textAlign: 'start',
            }}
          >
            <Typography variant="h1">Contact Us</Typography>
            <Typography variant="body1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              earum animi repellat provident. Iure odio vel iste pariatur nam?
              Odio ipsam minus aliquid excepturi ipsum molestiae libero magni.
              Rerum, error?
            </Typography>
          </Grid>
          <Grid
            item
            sm={12}
            lg={6}
            xs={12}
            xl={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h1">Get in Toutch</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Name" variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Address" variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Phone Number" variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
