# Patient Forms Refactor (Static HTML)

## Files
- patients-list.html — list of saved patients
- create-patient.html — *basic* registration (rarely changing fields)
- patient-profile.html — patient dashboard; opens other forms; contains stones + photo modal
- patient-treatment.html — treatment parameters (moved out of basic)
- patient-conditions.html — comorbidities (moved out of basic)
- add-stone.html — stone form (patched to save stones per patient via URL param `patient=`)

## How to run
Open `patients-list.html` in browser. Everything uses localStorage.

## Notes
Stones/photos/collapsed state are now stored per patient:
- temp_stones_v1__<patientId>
- temp_stone_photos_v1__<patientId>
- collapsed_groups_v1__<patientId>
