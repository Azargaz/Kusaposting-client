export default {
	palette: {
		primary: {
			light: '#48a999',
			main: '#00796b',
			dark: '#004c40',
			contrastText: '#ffffff'
		},
		secondary: {
			light: '#a98274',
			main: '#795548',
			dark: '#4b2c20',
			contrastText: '#ffffff'
		}
	},
	styles: {
		form: {
			textAlign: 'center'
		},
		image: {
			margin: '20px auto 20px auto',
			width: '100px',
			height: '100px',
			border: 'solid 1px black'
		},
		pageTitle: {
			margin: '10px auto 10px auto'
		},
		textField: {
			margin: '10px auto 10px auto'
		},
		button: {
			marginTop: 20,
			position: 'relative'
		},
		customError: {
			color: 'red',
			fontSize: '0.8rem',
			marginTop: '10'
		},
		progress: {
			position: 'absolute'
		},		
		invisibleSeparator: {
			border: 'none',
			margin: 4
		},
		visibleSeparator: {
			width: '100%',
			border: '1px solid rgba(0,0,0,0.1)',
			marginBottom: 20
		},
		paper: {
			padding: 20
		},
		profile: {
			'& .image-wrapper': {
				textAlign: 'center',
				position: 'relative',
				'& button': {
					position: 'absolute',
					top: '80%',
					left: '70%'
				}
			},
			'& .profile-image': {
				width: 200,
				height: 200,
				objectFit: 'cover',
				maxWidth: '100%',
				borderRadius: '50%',
				border: 'solid black 3px'
			},
			'& .profile-details': {
				textAlign: 'center',
				'& span, svg': {
					verticalAlign: 'middle'
				},
				'& a': {
					color: '#00796b'
				}
			},
			'& hr': {
				border: 'none',
				margin: '0 0 10px 0'
			},
			'& svg.button': {
				'&:hover': {
					cursor: 'pointer'
				}
			}
		},
		buttons: {
			textAlign: 'center',
			'& a': {
				margin: '20px 10px'
			}
		}
	}
};