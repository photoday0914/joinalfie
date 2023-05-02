import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import { Box, Button, Container, Input, Grid, Typography, Checkbox, TableContainer, Paper, TableHead, TableRow, Table, TableCell, TableBody, Stack} from '@mui/material'

interface ITask {
  name: string,
  description: string
}

export default function Home() {
  const [open , setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [taskList, setTaskList] = useState<ITask[]>([])
  const [mode, setMode] = useState(false) // true: edit mode, false: create mode
  const [editIndex, setEditIndex] = useState(0)

  const handleOpen = () => {
    setOpen(true)
    setMode(false)
    setName('')
    setDescription('')
  }

  const handleClose = () => setOpen(false)

  const handleEdit = (index: number) => {
    setMode(true)
    setOpen(true)    
    setName(taskList[index].name)
    setDescription(taskList[index].description)
    setEditIndex(index)
  }

  const handleDelete = (index: number) => {
    setTaskList(current =>
      current.filter(task => task !== taskList[index])
    )
  }

  const createTask = () => {    
    if (name && description){
      setTaskList(arr => [...arr, {name:name, description:description}])
      setName('')
      setDescription('')
      setOpen(false)
    } else alert("Enter Name and Description")
  }
  
  const saveTask = () => {    
    if (name && description){
      setTaskList(existingArr => 
        [
          ...existingArr.slice(0, editIndex), 
          {name:name, description:description}, 
          ...existingArr.slice(editIndex + 1)
        ]
      )
      setName('')
      setDescription('')
      setOpen(false)
    } else alert("Enter Name and Description")
  }

  return (
    <Container sx={{mt: {xs:2, md:4}}}>
      <Box textAlign={'right'}>
        <Button variant="contained" onClick={handleOpen}>Create a Task</Button>
      </Box>     

      <TableContainer component={Paper} sx={{mt: {xs:2, md:4}}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{width: '10%'}}>Name</TableCell>
              <TableCell sx={{width: '60%'}}>Description</TableCell>
              <TableCell width={'10%'} align="center">Completed</TableCell>
              <TableCell width={'10%'} align="center"></TableCell>
              <TableCell width={'10%'} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {taskList.map((task, index)=> {
            return (
            <TableRow key={index}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell align="center"><Checkbox/></TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleEdit(index)}>Edit</Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleDelete(index)}>Delete</Button>
                </TableCell>
            </TableRow>)
          })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          {!mode? 
            <Typography fontSize={25} textAlign={'center'}>Create a Task</Typography>:
            <Typography fontSize={25} textAlign={'center'}>Edit a Task</Typography>
          }
          <Stack direction={'row'} sx={{m: 3}} alignItems={'center'}>
            <Typography width={'35%'}>Name:</Typography>
            <Input 
              type="text" 
              placeholder="Enter a name here" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth              
            />
          </Stack>
          <Stack direction={'row'} sx={{m: 3}} alignItems={'center'}>
            <Typography width={'35%'}>Description:</Typography>
            <Input 
              type="text" 
              placeholder="Enter description here" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline              
            />
          </Stack>
          <Stack direction={'row'} justifyContent={'center'} sx={{mt:2}}>
            {
              !mode? 
              <Button sx={{m:1}} onClick={() => createTask()}>Create</Button>:
              <Button sx={{m:1}} onClick={() => saveTask()}>Save</Button>
            }
            <Button sx={{m:1}} onClick={() => handleClose()}>Close</Button>
          </Stack>
        </Box>          
      </Modal>
      
    </Container>
  )
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
