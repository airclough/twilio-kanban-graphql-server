import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

enum Status {
  BACKLOG = 'BACKLOG',
  TO_DO = 'TO_DO',
  ONGOING = 'ONGOING',
  DONE = 'DONE',
}

interface Task {
  description: string;
  id: string;
  name: string;
  status: Status;
}

const { env } = process;
const { HIPSUM_API_ENDPOINT } = env;
const statuses = [
  'BACKLOG',
  'TO_DO',
  'ONGOING',
  'DONE',
];

export const getTasks = async ( _, { numTasks } ) => {
  const hipsum: string[] | null = await axios.get( `${ HIPSUM_API_ENDPOINT }?type=hipster-centric&sentences=10` )
    .then( ( { data } ) => {
      const [ hipsumString ] = data;

      return hipsumString.split( ' ' );
    } )
    .catch( ( { response } ) => {
      if ( !response ) return;
      const { data } = response;
      const { errors } = data;
      console.error( JSON.stringify( errors ) );
    } );
  if ( !hipsum ) return null;
  const tasks: Task[] = [];

  for ( let i = 0; i < numTasks; i++ ) {
    const randomStartIndex = Math.floor( Math.random() * hipsum.length );
    const description = hipsum
      .slice( randomStartIndex, Math.floor( Math.random() * hipsum.length ) + ( randomStartIndex + 1 ) );
    const [ name ] = description;
    const status = statuses[ Math.floor( Math.random() * statuses.length ) ];

    tasks.push( {
      description: description.join( ' ' ),
      id: uuidv4(),
      name,
      status: status as Status,
    } );
  }

  return tasks;
};
