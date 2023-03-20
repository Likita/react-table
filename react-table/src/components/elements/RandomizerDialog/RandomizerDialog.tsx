import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IUser, Team, Sort, Status } from '../../../models/User.model';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import './RandomizerDialog.css';

interface IRandomizerDialog {
  userList: IUser[];
}

enum ViewMode {
  FORM,
  RESULT,
}

export default function RandomizerDialog({ userList }: IRandomizerDialog) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<IUser[]>([]);
  const [viewMode, setViewMode] = useState(ViewMode.FORM);

  const handleClickOpen = () => {
    setOpen(true);
    setViewMode(ViewMode.FORM);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    setViewMode(ViewMode.FORM);
  };

  const handleGenerate = () => {
    setViewMode(ViewMode.RESULT);
    setResult(getSpeakers(userList, team, order, Boolean(speaker)));
  };

  const [team, setTeam] = useState(Team.ALL);

  const handleTeamChange = (event: SelectChangeEvent) => {
    setTeam(event.target.value as Team);
  };

  const [order, setOrder] = useState(Sort.RANDOMIZE);

  const handleOrderChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as Sort);
  };

  const [speaker, setSpeaker] = useState(0);

  const handleSpeakerChange = (event: SelectChangeEvent) => {
    setSpeaker(Number(event.target.value));
  };

  function getSpeakers(array: IUser[], filterDev: Team, sortingOrder: Sort, speaker: boolean = false): IUser[] {
    const copiedFilteredUsersList = array.filter((user: IUser) => {
      return ((filterDev === Team.ALL || user.team === filterDev) && user.status !== Status.TEMP_UNAVAILABLE)
    }).map((user) => ({ ...user }));

    switch (sortingOrder) {
      case Sort.RANDOMIZE: {
        let currentIndex = copiedFilteredUsersList.length, randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [copiedFilteredUsersList[currentIndex], copiedFilteredUsersList[randomIndex]] = [
            copiedFilteredUsersList[randomIndex], copiedFilteredUsersList[currentIndex]];
        }
        break;
      }
      case Sort.SORT_BY_NAME: {
        copiedFilteredUsersList.sort((a: IUser, b: IUser) => {
          return a.userName > b.userName ? 1 : -1;
        });
        break;
      }
    }

    if (speaker) {
      const randomIndex = Math.floor(Math.random() * copiedFilteredUsersList.length);
      copiedFilteredUsersList.forEach((user: IUser, index: number) => {
        user.speaker = index === randomIndex;
      });

    }
    return copiedFilteredUsersList;
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Name randomizer
      </Button>
      <Dialog open={open} onClose={handleClose} PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '600px',
        },
      }}>
        <DialogTitle>Name randomizer</DialogTitle>
        <Box
          className='wrapper'
        >
          <DialogContent>
          {viewMode === ViewMode.FORM ?
            <form>
              <FormControl margin='dense' fullWidth>
                <InputLabel id='team-select-label'>Developers</InputLabel>
                <Select
                  labelId='team-select-label'
                  id='team-select'
                  value={team}
                  label='Developers'
                  fullWidth
                  onChange={handleTeamChange}
                >
                  <MenuItem value={Team.ALL}>All developers</MenuItem>
                  <MenuItem value={Team.A}>Team A</MenuItem>
                  <MenuItem value={Team.B}>Team B</MenuItem>
                  <MenuItem value={Team.C}>Team C</MenuItem>
                </Select>
              </FormControl>
              <FormControl margin='dense' fullWidth>
                <InputLabel id='order-select-label'>Sorting order</InputLabel>
                <Select
                  labelId='order-select-label'
                  id='order-select'
                  value={order}
                  label='Sorting order'
                  fullWidth
                  onChange={handleOrderChange}
                >
                  <MenuItem value={Sort.RANDOMIZE}>Random</MenuItem>
                  <MenuItem value={Sort.SORT_BY_NAME}>Alphabetical order</MenuItem>
                </Select>
              </FormControl>
              <FormControl margin='dense' fullWidth>
                <InputLabel id='speaker-select-label'>Speaker</InputLabel>
                <Select
                  labelId='speaker-select-label'
                  id='speaker-select'
                  value={String(speaker)}
                  label='Speaker'
                  fullWidth
                  onChange={handleSpeakerChange}
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>Yes</MenuItem>
                </Select>
              </FormControl>
            </form>
            :
            <>
              <p className='p'>Randomizer parameters:</p>
              <ul>
                <li>Team: {team}</li>
                <li>Order: {order}</li>
                <li>Speaker: {speaker ? 'True' : 'False'}</li>
              </ul>
              <p className='p'>List result:</p>
              {result.length === 0 ? <p>No active people in this team</p> :
                <ol className='user-list'>
                  {
                    result.map((user) =>
                      (<li key={user.id}>{user.userName} {user.speaker && <span className='speaker'>(Designated Speaker)</span>}</li>)
                    )
                  }
                </ol>
              }
            </>
          }
          </DialogContent>
          <DialogActions>
            {viewMode === ViewMode.FORM ?
              <Button onClick={handleClose}>Cancel</Button> :
              <Button onClick={handleBack}>Change parameters</Button>
            }
            <Button onClick={handleGenerate} color='success' variant='contained'>Generate {viewMode === ViewMode.RESULT && 'new'} list</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}