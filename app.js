const $ =document.querySelector.bind(document)
const $$ =document.querySelectorAll.bind(document)
const PLAYER_STORAGE_KEY ='MINH_QUAN'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem('PLAYER_STORAGE_KEY')) || {},
    songs : [
        
         {
            name: 'Tình yêu không thể phá vỡ',
            singer: 'DICKSON',
            path: './assets/songs/DICKSON - TÌNH YÊU KHÔNG THỂ PHÁ VỠ ( 永不失联的爱) - Người Yêu Nhỏ Bé Em Đang Lưu Lạc Nơi Đâu.mp3',
            image: './assets/img/tinhyeukhongthephavo.jpg'
        },
        {
            name: 'Chọn ngày đẹp nhất để biến mất',
            singer: 'Hạnh Sino',
            path: './assets/songs/「Lyrics Video」Ngày Đẹp Nhất Để Biến Mất - Hạnh Sino.mp3',
            image: './assets/img/hanhsino.jpg'
        },
        {
            name: 'Người ta đâu thương em',
            singer: 'LyLy',
            path: './assets/songs/NGƯỜI TA ĐÂU THƯƠNG EM - LYLY (Official Music Video).mp3',
            image: './assets/img/lyly.jpg'
        },
        {
            name: 'Hẹn em ở lần yêu thứ 2',
            singer: 'Nguyenn x @Dangtuanvu.Original',
            path: './assets/songs/Hẹn Em Ở Lần Yêu Thứ 2 - Nguyenn x @Dangtuanvu.Original - Official MV - Anh phải làm gì để em....mp3',
            image: './assets/img/lanyeu2.jpg'
        },
        {
            name: 'Thật ra em chẳng thương anh đến vậy đâu',
            singer: 'Nguyenn x @Dangtuanvu.Original',
            path: './assets/songs/Thật Ra Em Chẳng Thương Anh Như Vậy Đâu I Nguyenn x Đặng Tuấn Vũ - Official Lyrics Video.mp3',
            image: './assets/img/thatrraem.jpg'
        },
        {
            name: 'Mình chia tay đi',
            singer: 'ERIK',
            path: './assets/songs/ERIK - MÌNH CHIA TAY ĐI.mp3',
            image: './assets/img/minhchiataydi.jpg'
        },
        {
            name: 'Thế hệ tan vỡ',
            singer: 'Kaidinh x Sivan',
            path: './assets/songs/Kaidinh x Sivan - Thế hệ tan vỡ - Official Lyric Video.mp3',
            image: './assets/img/thehetanvo.jfif'
        },
        {
            name: 'RỒI TA SẼ NGẮM PHÁO HOA CÙNG NHAU',
            singer: 'O.lew',
            path: './assets/songs/RỒI TA SẼ NGẮM PHÁO HOA CÙNG NHAU - MV OFFICIAL - O.lew.mp3',
            image: './assets/img/ngamphaohoa.jpg'
        },
        {
            name: 'KHÔNG MUỐN MỘT MÌNH ',
            singer: 'VICKY NHUNG',
            path: './assets/songs/VICKY NHUNG - KHÔNG MUỐN MỘT MÌNH (CHILL VER.) (1).mp3',
            image: './assets/img/khongmuonmotminh.jpg'
        },
        {
            name: 'Người Em Từng Yêu ',
            singer: 'Ngân Ngân',
            path: './assets/songs/Người Em Từng Yêu - Ngân Ngân - Official Music Video 4k - Người Từng Làm Em Khóc....mp3',
            image: './assets/img/nguoiemtungyeu.jpg'
        },
        {
            name: 'EM LÀ KẺ ĐÁNG THƯƠNG',
            singer: 'PHÁT HUY T4',
            path: './assets/songs/EM LÀ KẺ ĐÁNG THƯƠNG - PHÁT HUY T4 -- OFFICIAL MV.mp3',
            image: './assets/img/emlakedangthuong.jpg'
        },
        {
            name: 'YÊU NHAU XONG RỒI',
            singer: 'KUUN ĐỨC NAM',
            path: './assets/songs/YÊU NHAU XONG RỒI - KUUN ĐỨC NAM - OFFICIAL MUSIC VIDEO - CHẲNG THỂ YÊU THÊM MỘT AI TỪ SAU NGÀY ẤY.mp3',
            image: './assets/img/yeunhauxongroi.jpg'
        },
        {
            name: 'I Love You So',
            singer: 'The Walters',
            path: './assets/songs/I Love You So .mp3',
            image: './assets/img/0.jpg'
        },
        {
            name: ' Tell Ur Mom II',
            singer: 'Winno ft Heily',
            path: './assets/songs/y2mate.com - Tell Ur Mom II  Winno ft HeilyCukak Remix Audio Lyrics Video.mp3',
            image: './assets/img/tell.jpg'
        },
    
            ],
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties:function () {
        Object.defineProperty(this, 'currentSong',{
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth

        //Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000, //10s
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        //Xử lý phóng to / thu nhỏ CD 
        document.onscroll = function () {
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth

        }

        //Xử lý khi click play 
        playBtn.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
            }else{
                audio.play()
            }
        }

        //Khi song play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        //Khi song pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
                progress.value = progressPercent
            }
        }

        //Khi tua song 
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        //Khi next song 
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        //Khi prev song 
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        //Khi random bài hát
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //Phát lại 1 bài hát 
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        //Xử lý next song song khi audio ended
        audio.onended = function () {
            if (_this.isRepeat){
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        //Lắng nghe hành vi click vào play list
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)') 
            if(songNode || e.target.closest('.option')) {
                //Xử lý khi click vào song
                 {if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                }
                }
                //Xử lý khi click vào option
                if(e.target.closest('.option')){

                }
            }
        }
    },
    scrollToActiveSong: function () {
        if(this.currentIndex === 0){
            document.documentElement.scrollTop = 0
        }
        setTimeout(() =>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block:'nearest',
            })
        },0)
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

        console.log(heading, cdThumb, audio)

    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function () {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length ) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while(newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function () {
        //Gán cấu hình từ cònfig vào app
        // this.loadConfig()

        //Định nghĩa các thuộc tính cho object
        this.defineProperties()

        //Lắng nghe xử lý các sự kiện (DOM event)
        this.handleEvents()


        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        //Render playlist
        this.render()

        //Hiển thị trạng thái ban đầu của button repeat và ban đầu 
        randomBtn.classList.toggle('active', _this.isRandom)
        repeatBtn.classList.toggle('active', _this.isRepeat)
    }        
}
app.start()

