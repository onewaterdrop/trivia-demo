


// Test TriviaCtrl

describe("Unit: Test TriviaCtrl", function() {


    beforeEach(
        module('triviaApp')
    );


    beforeEach(function() {

        module('triviaApp.services');
        module('triviaApp.mocks');
    });

    var TriviaCtrl, scope, aUserService, ScoreKeeper, aMakeQuestion, DreamFactory, MovieService;


    beforeEach(inject(function($controller, $rootScope, UserService, ScoreKeeperMock, MakeQuestion, DreamFactoryMock, MovieServiceMock) {

        scope = $rootScope.$new();
        aUserService = UserService;
        ScoreKeeper = ScoreKeeperMock;
        DreamFactory = DreamFactoryMock;
        MovieService = MovieServiceMock;
        aMakeQuestion = MakeQuestion;


        TriviaCtrl = $controller('TriviaCtrl', {

            $scope: scope,
            UserService: aUserService,
            ScoreKeeper: ScoreKeeper,
            DreamFactory: DreamFactory,
            MovieService: MovieService,
            MakeQuestion: aMakeQuestion

        });
    }));


    it("should be initialized for guests", function() {

        expect(scope.user).toEqual(aUserService.getUser());
        expect(scope.score).toEqual(ScoreKeeper.getScore());
        expect(scope.question).toBe('');
        expect(scope.userAnswer).toBe('');
        expect(scope.cheatAnswer).toBe('');
        expect(scope._actualAnswer).toBe('');
    });

    describe("Test $scope.init()", function() {


        afterEach(function() {
            DreamFactory.ready = true;
        });


        it("should not broadcast 'getMovie', if DreamFactory.ready === false", function() {

            DreamFactory.ready = false;

            spyOn(scope, "$broadcast");

            scope.init();

            expect(scope.$broadcast).not.toHaveBeenCalled();
        });


        it("should broadcast 'getMovie' if DreamFactory.ready === true", function() {

            spyOn(scope, "$broadcast");

            scope.init();

            expect(scope.$broadcast).toHaveBeenCalledWith('getMovie');
        });
    });



    it("should broadcast and respond to an event 'verify:answer' with 'userAnswer' when scope.verifyAnswer(userAnswer)", function() {

        spyOn(scope, '$broadcast').andCallThrough();
        spyOn(scope, '_verifyAnswer');
        spyOn(scope, '_saveUserScore');
        spyOn(scope, '_resetForm');


        var userAnswer = 'test';
        scope.verifyAnswer(userAnswer);

        expect(scope.$broadcast).toHaveBeenCalledWith('verifyAnswer', userAnswer);
        expect(scope._verifyAnswer).toHaveBeenCalledWith(userAnswer);
        expect(scope._saveUserScore).toHaveBeenCalled();
        expect(scope._resetForm).toHaveBeenCalled();
        expect(scope.$broadcast).toHaveBeenCalledWith('getMovie');
    });


    describe("Test $scope._verifyAnswer(userAnswer)", function() {

        beforeEach(function() {

            scope.userAnswer = 'my test answer';
            scope._actualAnswer = 'my test answer';
        });

        afterEach(function() {
            scope.userAnswer = '';
            scope._actualAnswer = '';
        });


        it("should compare both answers and return a boolean", function() {

            var isCorrectAnswer = scope._verifyAnswer(scope.userAnswer);
            expect(isCorrectAnswer).toBe(true);
        })
    });


    describe("Test $scope._storeQuestionAnswer(QAObj)", function() {

        var QAObj, movie;


        beforeEach(function() {

            scope.cheatAnswer = '';
            scope._actualAnswer = '';
            scope.question = '';

            movie = {"total": 1, "movies": [
                {"id": "16815", "title": "Melvin and Howard", "year": 1980, "mpaa_rating": "R", "runtime": 95, "release_dates": {"theater": "1980-09-19", "dvd": "1999-10-12"}, "ratings": {"critics_rating": "Fresh", "critics_score": 94, "audience_rating": "Upright", "audience_score": 61}, "synopsis": "", "posters": {"thumbnail": "http://content9.flixster.com/movie/28/52/285295_mob.jpg", "profile": "http://content9.flixster.com/movie/28/52/285295_pro.jpg", "detailed": "http://content9.flixster.com/movie/28/52/285295_det.jpg", "original": "http://content9.flixster.com/movie/28/52/285295_ori.jpg"}, "abridged_cast": [
                    {"name": "Paul Le Mat", "id": "363427263", "characters": ["Melvin Dummar"]},
                    {"name": "Jason Robards", "id": "162656868", "characters": ["Howard Hughes"]},
                    {"name": "Mary Steenburgen", "id": "162663795", "characters": ["Lynda Dummar"]},
                    {"name": "Jack Kehoe", "id": "351527442", "characters": ["Jim Delgado"]},
                    {"name": "Michael J. Pollard", "id": "359853588", "characters": ["Little Red"]}
                ], "alternate_ids": {"imdb": "0081150"}, "links": {"self": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815.json", "alternate": "http://www.rottentomatoes.com/m/melvin_and_howard/", "cast": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815/cast.json", "clips": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815/clips.json", "reviews": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815/reviews.json", "similar": "http://api.rottentomatoes.com/api/public/v1.0/movies/16815/similar.json"}}
            ], "links": {"self": "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Melvin+and+Howard&page_limit=30&page=1"}, "link_template": "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q={search-term}&page_limit={results-per-page}&page={page-number}"}


            QAObj = aMakeQuestion.questionBuilder(movie.movies[0]);

        });

        afterEach(function() {

            scope.cheatAnswer = '';
            scope._actualAnswer = '';
            scope.question = '';
        });


        it("should store the answers individually in scope variables", function() {

            scope._storeQuestionAnswer(QAObj);


            expect(scope.question).toEqual(QAObj.question);
            expect(scope._actualAnswer).toEqual(QAObj.answer);
            expect(scope.cheatAnswer).toEqual(QAObj.answer);
            expect(scope.cheatAnswer).toEqual(scope._actualAnswer);

        });

    });


    describe("Test $scope._resetForm()", function() {

        beforeEach(function() {

            scope.userAnswer = 'Test Answer';
        });


        afterEach(function() {

            scope.userAnswer = '';
        });


        it("should set scope.userAnswer to an empty string", function() {

            scope._resetForm();

            expect(scope.userAnswer).toEqual('');
        });
    });


    describe("Test $scope._saveUserScore", function() {

        beforeEach(function() {



        });


        afterEach(function() {


        });



        it("should stop execution if user is guest", function() {

            spyOn(aUserService, 'isLoggedIn');

            var result = scope._saveUserScore();

            expect(result).toBe(false);
            expect(aUserService.isLoggedIn).toHaveBeenCalled();
        });


        /**
         * FIX THIS TEST
         * IT DOESN'T CHECK FOR THE SCOREKEEPER FUNCTION TO BE CALLED
         */
        it("should call ScoreKeeper.updateScoreRecord(record) with the 'record' object", function() {

            var user = {
                id: 1,
                firstName: 'Test',
                lastName: 'User',
                displayName: 'Test User',
                sessionId: '0000000000',
                lastLogin: 'String Date',
                score: 50
            };


            var record = {
                table_name: 'TriviaScore',
                id: 1,
                id_field: 'user',
                body: {
                    score: 50
                }
            };

            aUserService.setUser(user);
            ScoreKeeper.setScore(50);


            spyOn(aUserService, 'isLoggedIn').andCallThrough();
            //spyOn(ScoreKeeper, 'updateScoreRecord').andReturn(record);

            scope._saveUserScore();


            expect(aUserService.isLoggedIn).toHaveBeenCalled();
            //expect(ScoreKeeper.updateScoreRecord).toHaveBeenCalledWith(record);

        });
    });
});