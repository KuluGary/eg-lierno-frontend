import React, { useEffect, useState } from "react";
import { Step1, Step2, Step3 } from "./steps";

import { Dialog, DialogContent, DialogActions, Stepper, Step, StepLabel, Button } from "@mui/material";

function getSteps() {
  return ["Selecciona tu imagen", "Modifica tu imagen", "Resultado"];
}

function getStepContent(stepIndex, setUpImg, upImg, cropImg, setCropImg, setDone, setImage, handleNext) {
  switch (stepIndex) {
    case 0:
      return <Step1 setUpImg={setUpImg} handleNext={handleNext} />;
    case 1:
      return <Step2 upImg={upImg} setCropImg={setCropImg} />;
    case 2:
      return <Step3 upImg={upImg} cropImg={cropImg} setImage={setImage} setDone={setDone} />;
    default:
      return "Unknown stepIndex";
  }
}

export default function ImageUploader({ open, setOpen, setImage }) {
  const [activeStep, setActiveStep] = useState(0);
  const [upImg, setUpImg] = useState();
  const [cropImg, setCropImg] = useState();
  const [done, setDone] = useState(false);
  const steps = getSteps();

  useEffect(() => {
    setActiveStep(0);
    setCropImg();
    setUpImg();
  }, [open]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setOpen(false);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validator = () => {
    switch (activeStep) {
      case 0:
        return !upImg;
      case 1:
        return false;
      case 2:
        return !done;
      default:
        return true;
    }
  };

  return (
    <Dialog
      sx={{ padding: 4 }}
      fullWidth
      open={open}
      maxWidth={"tablet"}
      acceptedFiles={["image/*"]}
      onClose={() => setOpen(false)}
    >
      <Stepper sx={{ p: 3 }} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <DialogContent>
        {getStepContent(activeStep, setUpImg, upImg, cropImg, setCropImg, setDone, setImage, handleNext)}
      </DialogContent>
      <DialogActions>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Atrás
        </Button>
        <Button disabled={validator()} variant="outlined" color="secondary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Acabar" : "Siguiente"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
