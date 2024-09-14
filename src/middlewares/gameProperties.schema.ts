import { Joi } from 'celebrate';

export const createGamePropertiesSchema = {
    body: Joi.object({
        chatRoom: Joi.string().optional(),
        gameArray: Joi.array()
            .items(
                Joi.array().items(
                    Joi.object({
                        word: Joi.string().required(),
                        team: Joi.string().valid('red', 'blue', 'assassin', 'civilian').required(),
                        clicked: Joi.boolean().required(),
                    })
                )
            )
            .required(),
        firstTeamWords: Joi.array().items(Joi.string()).required(),
        firstTeamUnguessedWords: Joi.array().items(Joi.string()).required(),
        secondTeamWords: Joi.array().items(Joi.string()).required(),
        civilianWords: Joi.array().items(Joi.string()).required(),
        civilianUnguessedWords: Joi.array().items(Joi.string()).required(),
        assassinWord: Joi.array().items(Joi.string()).required(),
        turn: Joi.string().valid('red', 'blue', 'assassin', 'civilian').required(),
        firstTeam: Joi.string().valid('red', 'blue').required(),
        secondTeam: Joi.string().valid('red', 'blue').required(),
        codeMasterView: Joi.boolean().required(),
        guessesRemaining: Joi.number().required(),
        allDisable: Joi.boolean().required(),
        firstTeamRemainingWords: Joi.number().required(),
        secondTeamRemainingWords: Joi.number().required(),
        firstTeamClues: Joi.array()
            .items(
                Joi.object({
                    clue: Joi.string().required(),
                    num: Joi.number().required(),
                })
            )
            .required(),
        secondTeamClues: Joi.array()
            .items(
                Joi.object({
                    clue: Joi.string().required(),
                    num: Joi.number().required(),
                })
            )
            .required(),
        secondTeamUnguessedWords: Joi.array().items(Joi.string()).required(),
        winner: Joi.string().valid('red', 'blue', null).required(),
        }),
};
export const setGamePropertiesSchema = {
    body: Joi.object({
        chatRoom: Joi.string().optional(),
        gameArray: Joi.array()
            .items(
                Joi.array().items(
                    Joi.object({
                        word: Joi.string().required(),
                        team: Joi.string().valid('red', 'blue', 'assassin', 'civilian').required(),
                        clicked: Joi.boolean().required(),
                    })
                )
            )
            .optional(),
        firstTeamWords: Joi.array().items(Joi.string()).optional(),
        firstTeamUnguessedWords: Joi.array().items(Joi.string()).optional(),
        secondTeamWords: Joi.array().items(Joi.string()).optional(),
        civilianWords: Joi.array().items(Joi.string()).optional(),
        civilianUnguessedWords: Joi.array().items(Joi.string()).optional(),
        assassinWord: Joi.array().items(Joi.string()).optional(),
        turn: Joi.string().valid('red', 'blue', 'assassin', 'civilian').optional(),
        firstTeam: Joi.string().valid('red', 'blue').optional(),
        secondTeam: Joi.string().valid('red', 'blue').optional(),
        codeMasterView: Joi.boolean().optional(),
        guessesRemaining: Joi.number().optional(),
        allDisable: Joi.boolean().optional(),
        firstTeamRemainingWords: Joi.number().optional(),
        secondTeamRemainingWords: Joi.number().optional(),
        firstTeamClues: Joi.array()
            .items(
                Joi.object({
                    clue: Joi.string().required(),
                    num: Joi.number().required(),
                })
            )
            .optional(),
        secondTeamClues: Joi.array()
            .items(
                Joi.object({
                    clue: Joi.string().required(),
                    num: Joi.number().required(),
                })
            )
            .optional(),
        secondTeamUnguessedWords: Joi.array().items(Joi.string()).optional(),
        winner: Joi.string().valid('red', 'blue', null).optional(),
        }),
};
export const noBodySchema = {
    body: Joi.object().keys({})
};