'use strict';

angular.module('triviaApp', [
        'ngRoute',
        'ngDreamFactory',
        'triviaApp.directives',
        'triviaApp.services',
        'ngMockE2E'
    ])
    .constant('DSP_URL', 'http://dreamfactory.h1b.bitnamiapp.com')
    .constant('DSP_API_KEY', 'trivia')
    .constant('DEV_ENV', 0)
    .config(['$locationProvider', function($locationProvider) {

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'TriviaCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/logout', {
                resolve: {
                    logout: ['$location', '$rootScope', 'UserService', 'DreamFactory', 'ScoreKeeper',
                        function ($location, $rootScope, UserService, DreamFactory, ScoreKeeper) {

                            DreamFactory.api.user.logout();
                            UserService.unsetUser();
                            ScoreKeeper.resetScore();
                            $rootScope.$broadcast('user:logout');
                            $location.url('/');
                        }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', '$injector', function ($delegate, $injector) {
            return function (exception, cause) {

                $injector.get('$rootScope').$broadcast('app:error', exception.message);
                return $delegate(exception, cause);
            }
        }]);
    }])
    .run(['$rootScope', function ($rootScope) {

        $rootScope.$on('$routeChangeStart', function (scope, next, current) {

            $rootScope.$broadcast('app:error:clear');
        })
    }])
    .run(['$httpBackend', 'DSP_URL', 'DEV_ENV', function ($httpBackend, DSP_URL, DEV_ENV) {

        var user = function() {
            return {
                app_groups: [],
                display_name: 'Valid User',
                email: 'valid@valid.com',
                first_name: 'valid_firstName',
                id: 1,
                is_sys_admin: false,
                last_login_date: '02/02/2014 00:00:00',
                last_name: 'valid_lastName',
                no_group_apps: [],
                session_id: '0000000000',
                ticket: '',
                ticket_expiry: '',
                user_data: [],
                user_source: 0
            }
        };

        var rawMovieData = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n{\"total\":2,\"movies\":[{\"id\":\"12226\",\"title\":\"Day for Night\",\"year\":1973,\"mpaa_rating\":\"PG\",\"runtime\":115,\"release_dates\":{\"theater\":\"1973-09-07\",\"dvd\":\"2003-03-18\"},\"ratings\":{\"critics_rating\":\"Fresh\",\"critics_score\":100,\"audience_rating\":\"Upright\",\"audience_score\":92},\"synopsis\":\"\",\"posters\":{\"thumbnail\":\"http://content7.flixster.com/movie/11/16/64/11166453_mob.jpg\",\"profile\":\"http://content7.flixster.com/movie/11/16/64/11166453_pro.jpg\",\"detailed\":\"http://content7.flixster.com/movie/11/16/64/11166453_det.jpg\",\"original\":\"http://content7.flixster.com/movie/11/16/64/11166453_ori.jpg\"},\"abridged_cast\":[{\"name\":\"Jacqueline Bisset\",\"id\":\"162654561\",\"characters\":[\"Julie\"]},{\"name\":\"Valentina Cortese\",\"id\":\"364612286\",\"characters\":[\"SA?verine\",\"Severine\",\"S?verine\"]},{\"name\":\"Francois Truffaut\",\"id\":\"162656997\",\"characters\":[\"Ferrand\"]},{\"name\":\"Alexandra Stewart\",\"id\":\"388373565\",\"characters\":[\"Stacey\"]},{\"name\":\"Jean-Pierre Aumont\",\"id\":\"289585471\",\"characters\":[\"Alexandre\"]}],\"alternate_ids\":{\"imdb\":\"0070460\"},\"links\":{\"self\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/12226.json\",\"alternate\":\"http://www.rottentomatoes.com/m/day_for_night/\",\"cast\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/12226/cast.json\",\"clips\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/12226/clips.json\",\"reviews\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/12226/reviews.json\",\"similar\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/12226/similar.json\"}},{\"id\":\"770670640\",\"title\":\"Aranyer Din Ratri (Days and Nights in the Forest)\",\"year\":1970,\"mpaa_rating\":\"Unrated\",\"runtime\":120,\"release_dates\":{\"theater\":\"2003-01-01\"},\"ratings\":{\"critics_rating\":\"Fresh\",\"critics_score\":100,\"audience_rating\":\"Upright\",\"audience_score\":99},\"synopsis\":\"\",\"posters\":{\"thumbnail\":\"http://content8.flixster.com/movie/10/87/04/10870426_mob.jpg\",\"profile\":\"http://content8.flixster.com/movie/10/87/04/10870426_pro.jpg\",\"detailed\":\"http://content8.flixster.com/movie/10/87/04/10870426_det.jpg\",\"original\":\"http://content8.flixster.com/movie/10/87/04/10870426_ori.jpg\"},\"abridged_cast\":[{\"name\":\"Soumitra Chatterjee\",\"id\":\"364611260\",\"characters\":[\"Ashim\"]},{\"name\":\"Subhendu Chatterjee\",\"id\":\"770676481\",\"characters\":[\"Sanjoy\"]},{\"name\":\"Samit Bhanja\",\"id\":\"770838985\",\"characters\":[\"Hari\"]},{\"name\":\"Sharmila Tagore\",\"id\":\"364611261\",\"characters\":[\"Aparna\"]},{\"name\":\"Aparna Sen\",\"id\":\"770671064\",\"characters\":[\"Hari's former lover\"]}],\"alternate_ids\":{\"imdb\":\"0065417\"},\"links\":{\"self\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/770670640.json\",\"alternate\":\"http://www.rottentomatoes.com/m/days_and_nights_in_the_forest/\",\"cast\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/770670640/cast.json\",\"clips\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/770670640/clips.json\",\"reviews\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/770670640/reviews.json\",\"similar\":\"http://api.rottentomatoes.com/api/public/v1.0/movies/770670640/similar.json\"}}],\"links\":{\"self\":\"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Day+for+Night&page_limit=30&page=1\"},\"link_template\":\"http://api.rottentomatoes.com/api/public/v1.0/movies.json?q={search-term}&page_limit={results-per-page}&page={page-number}\"}\n";


        if (DEV_ENV == 1) {

            $httpBackend.whenGET(/\/rest\/api_docs/).passThrough();
            $httpBackend.whenGET(/^views/).passThrough();



            var dataLogin = {
                test: function(dataLogin) {
                    var login = angular.fromJson(dataLogin);
                    return (login.email === 'valid@valid.com') && (login.password === 'valid');
                }
            };
            $httpBackend.whenPOST(/\/rest\/user\/session/, dataLogin).respond(user());


            $httpBackend.whenPOST(/\/rest\/user\/register/).respond(function(method, url, data, headers) {

                data = angular.fromJson(data);
                var newUser = new user();
                var name = data.email.split('@');

                newUser.display_name = name[0].split('.').join(" ").replace(/\b./g, function(m){ return m.toUpperCase(); });
                newUser.email = data.email;
                newUser.password = data.new_password;
                newUser.id = 2;

                return [200, newUser, {}];

            });



            $httpBackend.whenDELETE(/\/rest\/user\/session/).respond(true);

            $httpBackend.whenGET(/\/rest\/movies/).respond(angular.toJson(rawMovieData));

            $httpBackend.whenGET(/\/db\/triviascore\/1/).respond({id:1, user:1, score:50});
            $httpBackend.whenPOST(/\/db\/triviascore\/2/).respond({id:2, user:2, score:0});


        } else {

            $httpBackend.whenGET().passThrough();
            $httpBackend.whenPOST().passThrough();
            $httpBackend.whenDELETE().passThrough();
            $httpBackend.whenPATCH().passThrough();

        }


    }]);
