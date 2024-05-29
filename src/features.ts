import pods from '../public/pods.png'
import bar from '../public/bar.png'
import barLarge from '../public/barlarge.png'
import bluetoothcontent from '../public/bluetoothcontent.png'
import phone from '../public/call.png'
import callfreq from '../public/callfreq.png'
import accept from '../public/accept.png'
import decline from '../public/decline.png'
import content from '../public/Content.png'
import answeredcont from '../public/answeredcont.png'
import profile from '../public/profile.png'
import callicons from '../public/callicons.png'
import info from '../public/Info.png'
import album from '../public/album.png'
import musicicon from '../public/musicicon.png'
import musicname from '../public/musicname.png'
import controls from '../public/controls.png'
import progress from '../public/progress.png'
import ring from '../public/ring.png'
import eyeright from '../public/eyeright.png'
import eyeleft from '../public/eyeleft.png'
import mouth from '../public/mouth.png'
import nose from '../public/nose.png'

export const features = [
    {
        "display": pods,
        "content": bluetoothcontent,
        "other": bar,
        "otherlarge": barLarge,
    },
    {
        "display": phone,
        "callfreq": callfreq,
        "accept": accept,
        "decline": decline,
        "content": content,
        "answeredcont": answeredcont,
        "profile": profile,
        "callicons": callicons,
        "info": info,
    },
    {
        "display": album,
        "name": musicname,
        "freq": musicicon,
        "controls": controls,
        "progress": progress,
    },
    {
        "ring": ring,
        "eyeright": eyeright,
        "eyeleft": eyeleft,
        "mouth": mouth,
        "nose": nose,
    }
]