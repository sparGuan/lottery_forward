/**
 * @desc 全部接口配置
 * @namespace
 * 用户
 * @property {object} usercheckReal  验真
 * @property {object} oauth2access_token  APP端获取授权认证
 * 首页轮播banner
 * @property {object} banner  获取banner
 * 比赛
 * @property {object} gamesLevelgames_level  获取赛事级别
 * @property {object} getgamespointsall  获取每日赛事
 * @property {object} get_games_points_filter  赛选顶级、其他赛事
 * @property {object} get_games_points_id  获取一条赛点信息
 * 房间
 * @property {object} roomGames_room  获取所有庄家房间
 * @property {object} roomgames_roomsearch  筛选庄家房间 
 * @property {object} banker_disc  获取房间数据
 * @property {object} roomCreate_order  庄下单
 * @property {object} create_bets_order  玩家下单
 * @property {object} playersreceivebonus  玩家领取奖金
 * @property {object} banker_order_record  庄家领取奖金
 * 记录
 * @property {object} player_order_record  玩家下单记录
 * @property {object} bankerOrderRecordBanker_order_record  庄家下单记录
 * 
 */

// /api/bankerOrderRecord/banker_order_record
import ip from './ip.js'

export const Interface = {
    usercheckReal: {
        url: ip + '/user/checkReal',
        method: 'POST'
    },
    oauth2access_token: {
        url: ip + '/oauth2/access_token',
        method: 'POST'
    },
    getgamespointsall: {
        url: ip + '/api/v1/get_games_points_all',
        type: 'GET'
    },
    banner: {
        url: ip + '/api/banner/banner',
        type: 'GET'
    },
    gamesLevelgames_level: {
        url: ip + '/api/gamesLevel/games_level',
        type: 'GET'
    },
    get_games_points_filter: {
        url: ip + '/api/v1/get_games_points_filter',
        type: 'GET'
    },
    get_games_points_id: {
        url: ip + '/api/v1/get_games_points_id',
        type: 'GET'
    },
    roomGames_room: {
        url: ip + '/api/room/games_room',
        type: 'GET'
    },
    roomgames_roomsearch: {
        url: ip + '/api/room/games_room/search',
        type: 'POST'
    },
    banker_disc: {
        url: ip + '/api/disc/banker_disc',
        type: 'POST'
    },
    roomCreate_order: {
        url: ip + '/api/room/create_order',
        type: 'POST'
    },
    create_bets_order: {
        url: ip + '/api/v1/create_bets_order',
        type: 'POST'
    },
    player_order_record: {
        url: ip + '/api/playerOrderRecord/player_order_record',
        type: 'POST'
    },
    playersreceivebonus: {
        url: ip + '/api/v1/player_order_record',
        type: 'POST'
    },
    banker_order_record: {
        url: ip + '/api/v1/banker_order_record',
        type: 'POST'
    },
    bankerOrderRecordBanker_order_record: {
        url: ip + '/api/bankerOrderRecord/banker_order_record',
        type: 'POST'
    }

}

