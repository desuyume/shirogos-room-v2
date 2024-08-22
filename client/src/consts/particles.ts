import { IParticlesProps } from '@tsparticles/react'

export const pariclesPropsMain: IParticlesProps = {
  options: {
    fullScreen: {
      enable: false
    },
    background: {
      color: '#DEDEDE'
    },
    particles: {
      number: {
        value: 168,
        density: {
          enable: true
          // value_area: 1443.07085477897,
        }
      },
      color: {
        value: '#c34375'
      },
      shape: {
        type: 'circle'
        // stroke: {
        // width: 0,
        // color: '#000000',
        // },
        // polygon: {
        // 	nb_sides: 5,
        // },
        // image: {
        // src: 'img/github.svg',
        // width: 100,
        // height: 100,
        // },
      },
      opacity: {
        value: 0.585245402215916,
        // random: false,
        animation: {
          enable: false,
          speed: 2.92347796428484,
          // opacity_min: 0.422280150396699,
          sync: true
        }
      },
      size: {
        value: 8.01706030432762,
        animation: {
          enable: false,
          speed: 38.9797061904646,
          // size_min: 0.1,
          mode: 'random',
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 769.637789215451,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'top',
        random: false,
        straight: false,
        outModes: 'out',
        // bounce: false,

        attract: {
          enable: false,
          rotate: {
            x: 2405.11809129828,
            y: 2565.45929738484
          }
        }
      }
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onHover: {
          enable: false,
          mode: 'grab'
        },
        onClick: {
          enable: true,
          mode: 'push'
        },
        resize: {
          enable: true
        }
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  }
}
