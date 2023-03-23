import { BiExport } from 'react-icons/bi';
import { GiTurtle, GiFrog, GiSpottedBug, GiSandSnake, GiSquirrel } from 'react-icons/gi';
import { FaClipboard } from 'react-icons/fa'
import { TbTable } from 'react-icons/tb';
import { HiDocumentPlus, HiFolderPlus } from 'react-icons/hi2';
import { MdViewColumn } from 'react-icons/md';

export function TurtleIcon() { return (<GiTurtle />) }
export function AmphibianIcon() { return (<GiFrog />) }
export function ArthropodIcon() { return (<GiSpottedBug />) }
export function SnakeIcon() { return (<GiSandSnake />) }
export function MammalIcon() { return (<GiSquirrel />) }
export function ExportIcon() { return (<BiExport />) }
export function FormBuilderIcon() { return (<TbTable />) }
export function SessionIcon() { return (<FaClipboard />) }
export function NewSessionIcon() { return (<HiFolderPlus />) }
export function NewDataIcon() { return (<HiDocumentPlus />) }
export function ColumnToggleIcon() { return (<MdViewColumn />) }

export function LizardIcon({ className }) {
    return (
        <svg className={className + " fill-current"} viewBox="0 0 512 512">
            <path d="M333.21 14.08c.18-.6 1.51-.5 1.89 0 1.88 2.47 2.6 8.95 3.37 13.51.91 5.43 1.09 10.98 1.92 16.43.23 1.48 1.42 3.24 2.68 3.94.63.35 2.84-1.15 3.62-2.3 2.83-4.16 5.28-8.59 8.06-12.79.92-1.4 1.93-3.39 3.63-3.63.49-.07 1.08.26 1.3.7.77 1.56-.29 3.53-.85 5.15-1.69 4.92-3.74 9.72-5.36 14.66-1.23 3.75.05 5.1 3.89 4.26 4.31-.93 8.54-2.23 12.86-3.14 1.17-.25 3.21-.59 3.77.56.57 1.18-.9 2.69-1.96 3.41-1.54 1.07-1.54 1.07-2.37 1.53-4.26 2.38-8.6 4.62-12.75 7.17-1.3.8-2.09 2.44-3.11 3.7 1.39.84 2.7 1.94 4.21 2.45 1.77.6 3.78.48 5.56 1.06 1.5.49 3.98.74 4.22 2.33.26 1.77-1.86 3.41-3.74 3.84-.82.19-1.82.37-2.72.65-6.3 1.89-12.82 3.29-18.84 5.86-7.01 3-12.11 8.51-15.07 15.63-3.94 9.45-2.79 13.57 6.95 16.73 9.49 3.08 19.58 4.41 29.47 6.11 5.88 1.01 11.41-.95 15.89-4.7 8.8-7.38 17.23-15.18 25.9-22.72 8.46-7.35 16.97-14.01 28.85-15.91 14.59-2.34 28.93-.79 43.33.39 6.7.55 10.67 8.2 7.72 14.38-3.51 7.38-7.35 14.69-11.94 21.42-2.85 4.17-6.84 8.12-11.22 10.57-8.21 4.6-17.13 7.92-25.65 11.99-10.63 5.07-21.52 9.75-31.56 15.82-4.32 2.61-8.04 7.83-9.8 12.68-3.63 9.98-4.58 20.57-2.13 31.18.87 3.77 2.94 6.12 7.01 5.12 4.89-1.2 9.82-2.48 14.47-4.37 9.64-3.93 17.11-9.76 18.06-21.41.31-3.82-.43-10.54 3.92-11.77 1.65-.47 2.12 1.4 2.19 1.84.53 3.23.82 6.5 1.41 9.72.23 1.27.75 2.74 1.66 3.51.41.35 2.26-.58 3.15-1.3 3.56-2.86 6.94-5.95 10.52-8.78 1.13-.89 2.63-2.28 4.06-1.84.38.12.81.66.63 1.02-3.16 6.15-7.76 10.5-12.11 16.39 9.84 1.96 23.32-10.24 24.71-4.49.49 2.05-6.58 4.49-10.06 6.29-3.56 1.84-7.11 3.71-9.28 9.27 4.68 0 8.38-.05 12.08.01 6.28.11 12.57.22 18.85.54 1.02.05 2.81.65 2.96 1.81.17 1.3-1.61 2.24-2.7 2.82-1.2.64-2.73.79-4.13.88-7.86.48-15.73.85-23.6 1.34-1.74.11-3.85-.28-5.19.86-.4.34-.67 1-.5 1.5.91 2.72 4.46 3.71 7.06 4.89 3.11 1.41 6.82 2.77 4.92 6.61-.6 1.21-5.71.97-8.41.19-5.74-1.66-11.32-3.93-16.82-6.29-4.47-1.92-8.89-2.45-13.27-.36-8.52 4.07-17 8.24-25.35 12.64-9.84 5.19-18.45 3.06-22.39-7.31-2.86-7.51-3.48-15.86-5.2-23.82-.67-3.08-1.62-6.1-2.44-9.15-4.12.67-6.08 2.58-7.98 4.83-16.56 19.62-33.1 39.27-49.13 59.32-8.99 11.24-6.44 16.9 7.63 20.3 6.88 1.66 13.66 3.8 20.37 6.04 5.25 1.76 7.93 5.29 8.18 11.3.49 11.5-5.3 19.86-12.57 27.55-5.74 6.07-12 11.63-17.79 17.65-1.22 1.27-1.4 3.54-2.06 5.34 1.99.47 4.1 1.63 5.94 1.28 5.25-.98 10.36-2.73 15.59-3.83 1.6-.34 4.41-.87 5.16.71.79 1.67-1.54 3.6-2.88 4.66-2.07 1.64-4.77 2.45-6.96 3.96-1.16.8-2.63 2.47-2.46 3.49.18 1.08 2.04 2.28 3.38 2.66 2.56.73 5.26 1.09 7.89 1.39 2.93.34 7.26.65 7.28 3.32.02 2.79-4.62 3.22-7.56 3.54-2.8.3-5.64.78-8.47 1.13l-.3 1.47c1.46 1.27 2.87 2.59 4.39 3.8 4.81 3.82 9.76 7.48 14.41 11.48 1.02.88 2.5 3.2 1.51 4.44-.91 1.14-3.13.19-4.32-.44-6.14-3.21-12.12-6.74-18.26-9.95-1.21-.64-2.89-.4-4.35-.56.02 1.46-.42 3.13.14 4.33 2.32 5 4.73 9.97 7.49 14.74 6.06 10.5 8.63 21.6 6.07 33.56-.5 2.36-.9 6.88-3.4 6.67-2.42-.2-1.88-4.55-2.22-6.92-1.02-7.26-.46-15.02-2.86-21.75-4.17-11.71-13.09-20.62-21.3-29.77-.5-.56-1.58-.59-3.2-1.15.64 4.63 1.32 8.59 1.64 12.58.11 1.33.25 3.72-1.13 4.12-1.4.41-2.62-1.7-3.21-2.9-1.52-3.08-3.06-6.27-3.82-9.6-1.53-6.75-2.56-13.61-3.76-20.43-2.36-13.42-.76-25.71 9.91-35.56 2.89-2.66 5.55-5.62 8.02-8.68 2.66-3.3 5.26-6.71 7.35-10.38 1.73-3.03 1.35-6.14-2.14-8.1-12.36-6.96-26.82-2.06-31.47 11.26-2.63 7.55-3.72 15.62-5.92 23.33-3.88 13.62-8.28 27.09-12.1 40.72-5.55 19.83-12.72 38.99-23.37 56.64-15.25 25.25-33.74 47.75-59.77 62.5-18.22 10.33-38.08 14.99-59.22 11.31-34.5-6-59.12-25.99-77.18-55.02-9.65-15.52-15.93-32.45-20.25-50.18-3.98-16.32-6.01-32.8-5.04-49.6.09-1.61.06-3.83 1.44-4.76.37-.25.98-.17 1.34.1 1.34 1 1.37 3.08 1.73 4.7a441.76 441.76 0 0 1 3.19 15.72c5.17 28.33 13.94 55.3 30.7 79.08 14.95 21.21 34.97 34.87 60.99 38.38 7.37.99 15.19 1.1 22.48-.21 17.26-3.1 31.37-12.18 43.61-24.75 25.8-26.48 44.22-56.96 51.18-93.56 4.08-21.47 7.78-43.05 10.39-64.74 1.83-15.25-.34-16.7-14.9-22.49-12.19-4.84-17.2-4.6-17.63 13.13-.17 7 1.51 14.05 2.5 21.06 1.47 10.43 2.5 20.76-4.28 30.01-7.34 10.02-14.6 20.11-22.1 30.01-.8 1.05-3.17 2.52-4.47 1.58-1.3-.94-.5-3.44.11-4.76 1.65-3.56 4.16-6.76 5.58-10.39.88-2.24 1.44-6.17.24-7.28-1.59-1.48-5.28-1.79-7.65-1.13-9.39 2.64-18.62 5.84-27.9 8.88-5.58 1.83-10.01 4.92-12.78 10.44-2.32 4.63-5.2 9.02-8.25 13.22-.96 1.33-3.24 3.31-4.91 2.5-1.73-.84-1.33-3.81-1.13-5.62.22-1.94 1.29-3.89 2.34-5.63 3.01-5 5.7-10.31 9.46-14.68 2.82-3.28 6.79-6.06 10.8-7.71 6.22-2.56 12.96-3.85 19.4-5.93 3.55-1.14 6.93-2.79 10.39-4.22-.12-.71-.25-1.43-.37-2.14-3.62-.33-7.23-.74-10.85-.98-5.34-.35-10.7-.44-16.02-.96-1.29-.13-3.68-.86-3.67-2.32 0-1.43 2.32-2.09 3.59-2.26 4.36-.59 8.79-.72 13.17-1.16 4.08-.41 8.14-.99 12.21-1.5l.24-2.07c-1.83-.86-3.6-1.91-5.51-2.53-3.89-1.25-7.94-2.07-11.77-3.49-1.37-.51-3.77-1.81-3.42-3.39.35-1.55 3.02-1.71 4.43-1.58 6.26.59 12.48 1.64 18.74 2.32 1.73.19 3.54-.34 5.31-.53-.67-1.8-1.06-3.79-2.08-5.36-1.54-2.36-3.7-4.32-5.23-6.68-.64-.98-1.38-2.92-.48-3.87.9-.95 2.79-.26 3.88.25 1.53.71 2.77 2.04 4.13 3.11 2.47 1.95 4.84 4.05 7.45 5.8 1.16.78 2.8.86 4.22 1.26.32-1.46.93-2.93.88-4.37-.1-2.83-.65-5.63-.86-8.46-.93-12.07-2.11-24.13-2.58-36.22-.31-7.94 2.53-11.43 10.39-11.76 11.6-.49 23.29-.32 34.86.57 12.2.93 12.86.91 18.05-10.02 4.4-9.25 8.72-18.59 13.93-27.38 6.81-11.48 13.43-23.25 24.77-31.28 7.97-5.64 15.71-11.6 23.47-17.52 11.4-8.71 11.04-13.96-1.12-21.53-6.68-4.16-13.53-8.16-19.69-13.02-6.81-5.37-7.91-11.93-4.56-19.92 4.55-10.84 12.11-19.55 20.4-27.55 3.47-3.35 4.56-6.65 3.24-10.92-.79-2.53-1.98-4.95-3.14-7.35-1.72-3.54-3.67-6.97-5.32-10.54-.38-.82-.64-2.39.14-3.06.87-.75 2.55-.19 3.38.37 1.68 1.13 2.95 2.85 4.58 4.07 1.79 1.34 3.79 2.38 5.7 3.56.33-2.35.97-4.7.94-7.05-.12-9.77-1.06-24 .57-29.37z" />
        </svg>
    )
}

export function GoogleIcon({ className }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4" />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853" />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05" />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335" />
            <path
                d="M1 1h22v22H1z"
                fill="none" />
        </svg>
    );
}

export function EditIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
        </svg>
    )
}

export function DeleteIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
        </svg>
    )
}

export function CheckIcon() {
    return (
        <svg
            key='check'
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    )
}

export function XIcon() {
    return (
        <svg
            key='X'
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

export function ArrowIcon({ direction }) {

    const directionMap = {
        'up': 'rotate-180',
        'down': 'rotate-0',
        'left': 'rotate-90',
        'right': '-rotate-90'
    }

    let rotation = directionMap[direction] || directionMap['down'];


    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`m-auto w-4 h-4 transform ${rotation}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    )
}