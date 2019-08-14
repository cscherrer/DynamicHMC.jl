var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Overview",
    "title": "Overview",
    "category": "page",
    "text": ""
},

{
    "location": "#Introduction-1",
    "page": "Overview",
    "title": "Introduction",
    "category": "section",
    "text": "This package implements a variant of the “No-U-Turn Sampler” of Hoffmann and Gelman (2014), as described in Betancourt (2017). In order to make the best use of this package, you should read at least the latter paper thoroughly.This package is mainly useful for Bayesian inference. In order to use it, you need to be familiar with the conceptual building blocks of Bayesian inference, most importantly, you should be able to code a (log) posterior as a function in Julia. For various techniques and a discussion of MCMC methods (eg domain transformations, or integrating out discrete parameters), you may find the Stan Modeling Language manual helpful. If you are unfamiliar with Bayesian methods, Bayesian Data Analysis is a good introduction, among other great books.The package aims to “do one thing and do it well”: given a log density functionell mathbbR^k to mathbbRfor which you have values ell(x) and the gradient nabla ell(x), it samples values from a densityp(x) propto exp(ell(x))using the algorithm above.The package provides a framework to tune the algorithm to find near-optimal parameters for sampling, and also diagnostics that are specific to the algorithm.However, following a modular approach, it does not provideDomain transformations from subsets of mathbbR^k. For that, see TransformVariables.jl.\nAutomatic differentiation. Julia has a thriving AD ecosystem which should allow you to implement this. This package uses LogDensityProblems.jl for defining (log) density functions, which already has some one-liner solutions for AD, and is easily extensible for other methods.\nGeneric MCMC diagnostics not specific to NUTS. See MCMCDiagnostics.jl for an implementation of hatR and effective sample size calculations."
},

{
    "location": "#Examples-1",
    "page": "Overview",
    "title": "Examples",
    "category": "section",
    "text": "Worked examples of using this package for Bayesian inference are available in the repository DynamicHMCExamples.jl. It is highly recommended that you skim through them first."
},

{
    "location": "#Support-1",
    "page": "Overview",
    "title": "Support",
    "category": "section",
    "text": "If you have questions, feature requests, or bug reports, please open an issue. I would like to emphasize that it is perfectly fine to open issues just to ask questions."
},

{
    "location": "api/#",
    "page": "High-level API",
    "title": "High-level API",
    "category": "page",
    "text": ""
},

{
    "location": "api/#Sampling-and-accessors-1",
    "page": "High-level API",
    "title": "Sampling and accessors",
    "category": "section",
    "text": "Most users would use this function, which initializes and tunes the parameters of the algorithm, then samples. Parameters can be set manually for difficult posteriors.NUTS_init_tune_mcmcimportant: Important\nThe NUTS sampler saves a random number generator and uses it for random draws. When running in parallel, you should initialize NUTS_init_tune_mcmc with a random number generator as its first argument explicitly, making sure that each thread has its own one.These functions can be used use to perform the steps above manually.NUTS_init\ntune\nmcmcThe resulting sample is a vector of NUTS_Transition objects, for which the following accessors exist:NUTS_Transition\nget_position\nget_neg_energy\nget_depth\nget_termination\nget_acceptance_rate\nget_steps\nget_position_matrix"
},

{
    "location": "api/#Diagnostics-1",
    "page": "High-level API",
    "title": "Diagnostics",
    "category": "section",
    "text": "These are NUTS-specific diagnostics and statistics (except for sample_cov, which is a convenience function). It is also prudent to use generic MCMC convergence diagnostics, as suggested in the introduction.NUTS_statistics\nsample_cov\nEBFMI"
},

{
    "location": "api/#Fine-grained-control-1",
    "page": "High-level API",
    "title": "Fine-grained control",
    "category": "section",
    "text": ""
},

{
    "location": "api/#Kinetic-energy-1",
    "page": "High-level API",
    "title": "Kinetic energy",
    "category": "section",
    "text": "KineticEnergy\nEuclideanKE\nGaussianKE"
},

{
    "location": "api/#tuning-1",
    "page": "High-level API",
    "title": "NUTS parameters and tuning",
    "category": "section",
    "text": "NUTS\nStepsizeTuner\nStepsizeCovTuner\nTunerSequence\nmcmc_adapting_ϵ\nbracketed_doubling_tuner"
},

{
    "location": "lowlevel/#",
    "page": "Low-level building blocks",
    "title": "Low-level building blocks",
    "category": "page",
    "text": "CurrentModule = DynamicHMC"
},

{
    "location": "lowlevel/#Notation-1",
    "page": "Low-level building blocks",
    "title": "Notation",
    "category": "section",
    "text": "Notation follows Betancourt (2017), with some differences.Instead of energies, negative energies are used in the code.The following are used consistently for variables:ℓ: log density we sample from, supports the interface of LogDensityProblems.AbstractLogDensityProblem\nκ: distribution/density that corresponds to kinetic energy\nH: Hamiltonian\nq: position\np: momentum\nz: point in phase space (q,p)\nϵ: stepsize\na: acceptance rate\nA: acceptance tuning state\nζ: proposal from trajectory (phase point and weight)\nτ: turn statistic\nd: divergence statistic\nπ: log density (different from papers)\nΔ: logdensity relative to initial point of trajectory"
},

{
    "location": "lowlevel/#Low-level-building-blocks-1",
    "page": "Low-level building blocks",
    "title": "Low-level building blocks",
    "category": "section",
    "text": "This is documented only for developers. These are not part of the public API, if you are using them you should reconsider or file an issue."
},

{
    "location": "lowlevel/#Hamiltonian-and-leapfrog-1",
    "page": "Low-level building blocks",
    "title": "Hamiltonian and leapfrog",
    "category": "section",
    "text": "Hamiltonian\nPhasePoint\nphasepoint_in\nrand_phasepoint\nneg_energy\nget_p♯\nloggradient\nleapfrog"
},

{
    "location": "lowlevel/#DynamicHMC.find_initial_stepsize",
    "page": "Low-level building blocks",
    "title": "DynamicHMC.find_initial_stepsize",
    "category": "function",
    "text": "find_initial_stepsize(parameters, A)\n\n\nFind an initial stepsize that matches the conditions of parameters (see InitialStepsizeSearch).\n\nA is the local acceptance ratio (uncapped). When given a Hamiltonian H and a phasepoint z, it will be calculated using local_acceptance_ratio.\n\n\n\n\n\n"
},

{
    "location": "lowlevel/#DynamicHMC.InitialStepsizeSearch",
    "page": "Low-level building blocks",
    "title": "DynamicHMC.InitialStepsizeSearch",
    "category": "type",
    "text": "struct InitialStepsizeSearch\n\nParameters for the search algorithm for the initial stepsize.\n\nThe algorithm finds an initial stepsize ϵ so that the local acceptance ratio A(ϵ) satisfies\n\na_textmin  A(ϵ)  a_textmax\n\nThis is achieved by an initial bracketing, then bisection.\n\na_min\nLowest local acceptance rate.\na_max\nHighest local acceptance rate.\nϵ₀\nInitial stepsize.\nC\nScale factor for initial bracketing, > 1. Default: 2.0.\nmaxiter_crossing\nMaximum number of iterations for initial bracketing.\nmaxiter_bisect\nMaximum number of iterations for bisection.\n\nnote: Note\nCf. Hoffman and Gelman (2014), which does not ensure bounds for the acceptance ratio, just that it has crossed a threshold. This version seems to work better for some tricky posteriors with high curvature.\n\n\n\n\n\n"
},

{
    "location": "lowlevel/#DynamicHMC.find_crossing_stepsize",
    "page": "Low-level building blocks",
    "title": "DynamicHMC.find_crossing_stepsize",
    "category": "function",
    "text": "find_crossing_stepsize(parameters, A, ϵ₀)\nfind_crossing_stepsize(parameters, A, ϵ₀, Aϵ₀)\n\n\nFind the stepsize for which the local acceptance rate A(ϵ) crosses a.\n\nReturn ϵ₀, A(ϵ₀), ϵ₁, A(ϵ₁), whereϵ₀andϵ₁are stepsizes before and after crossingawithA(ϵ)`, respectively.\n\nAssumes that A(ϵ₀)  (a_textmin a_textmax), where the latter are defined in parameters.\n\nparameters: parameters for the iteration.\nA: local acceptance ratio (uncapped), a function of stepsize ϵ\nϵ₀, Aϵ₀: initial value of ϵ, and A(ϵ₀)\n\n\n\n\n\n"
},

{
    "location": "lowlevel/#DynamicHMC.bisect_stepsize",
    "page": "Low-level building blocks",
    "title": "DynamicHMC.bisect_stepsize",
    "category": "function",
    "text": "bisect_stepsize(parameters, A, ϵ₀, ϵ₁)\nbisect_stepsize(parameters, A, ϵ₀, ϵ₁, Aϵ₀)\nbisect_stepsize(parameters, A, ϵ₀, ϵ₁, Aϵ₀, Aϵ₁)\n\n\nReturn the desired stepsize ϵ by bisection.\n\nparameters: algorithm parameters, see InitialStepsizeSearch\nA: local acceptance ratio (uncapped), a function of stepsize ϵ\nϵ₀, ϵ₁, Aϵ₀, Aϵ₁: stepsizes and acceptance rates (latter optional).\n\nThis function assumes that ϵ₀  ϵ₁, the stepsize is not yet acceptable, and the cached A values have the correct ordering.\n\n\n\n\n\n"
},

{
    "location": "lowlevel/#DynamicHMC.local_acceptance_ratio",
    "page": "Low-level building blocks",
    "title": "DynamicHMC.local_acceptance_ratio",
    "category": "function",
    "text": "local_acceptance_ratio(H, z)\n\n\nReturn a function of the stepsize (ϵ) that calculates the local acceptance ratio for a single leapfrog step around z along the Hamiltonian H. Formally, let\n\nA(ϵ) = exp(logdensity(H, leapfrog(H, z, ϵ)) - logdensity(H, z))\n\nNote that the ratio is not capped by 1, so it is not a valid probability per se.\n\n\n\n\n\n"
},

{
    "location": "lowlevel/#Finding-initial-stepsize-\\epsilon-1",
    "page": "Low-level building blocks",
    "title": "Finding initial stepsize epsilon",
    "category": "section",
    "text": "Local stepsize tuning.The local acceptance ratio is technically a probability, but for finding the initial stepsize, it is not capped at 1.Also, the values are cached as this is assumed to be moderately expensive to calculate.find_initial_stepsize\nInitialStepsizeSearch\nfind_crossing_stepsize\nbisect_stepsize\nlocal_acceptance_ratio"
},

{
    "location": "lowlevel/#Dual-averaging-1",
    "page": "Low-level building blocks",
    "title": "Dual averaging",
    "category": "section",
    "text": "DualAveragingParameters\nDualAveragingAdaptation\nget_ϵ\nadapting_ϵ\nadapt_stepsize"
},

{
    "location": "lowlevel/#Abstract-trajectory-interface-1",
    "page": "Low-level building blocks",
    "title": "Abstract trajectory interface",
    "category": "section",
    "text": "In contrast to other reference implementations, the algorithm is implemented in a functional style using immutable values. The intention is to provide more transparency and facilitate fine-grained unit testing.adjacent_tree\nTermination\nsample_trajectory"
},

{
    "location": "lowlevel/#Proposals-1",
    "page": "Low-level building blocks",
    "title": "Proposals",
    "category": "section",
    "text": "Proposal\ncombined_logprob_logweight\ncombine_proposals"
},

{
    "location": "lowlevel/#Divergence-statistics-1",
    "page": "Low-level building blocks",
    "title": "Divergence statistics",
    "category": "section",
    "text": "DivergenceStatistic\ndivergence_statistic\nisdivergent\ncombine_divstats"
},

{
    "location": "lowlevel/#Turn-analysis-1",
    "page": "Low-level building blocks",
    "title": "Turn analysis",
    "category": "section",
    "text": "TurnStatistic\ncombine_turnstats\nisturning"
},

{
    "location": "lowlevel/#Sampling-1",
    "page": "Low-level building blocks",
    "title": "Sampling",
    "category": "section",
    "text": "Trajectory\nleaf\nmove\nNUTS_transition"
},

{
    "location": "lowlevel/#Tuning-1",
    "page": "Low-level building blocks",
    "title": "Tuning",
    "category": "section",
    "text": "DynamicHMC.AbstractTuner"
},

{
    "location": "lowlevel/#diagnostics_lowlevel-1",
    "page": "Low-level building blocks",
    "title": "Diagnostics",
    "category": "section",
    "text": "NUTS_Statistics\nACCEPTANCE_QUANTILES\nexplore_local_acceptance_ratios"
},

{
    "location": "lowlevel/#Reporting-information-during-runs-1",
    "page": "Low-level building blocks",
    "title": "Reporting information during runs",
    "category": "section",
    "text": "Samplers take an AbstractReport argument, which is then used for reporting. The interface is as follows.DynamicHMC.AbstractReport\nDynamicHMC.report!\nDynamicHMC.start_progress!\nDynamicHMC.end_progress!The default isReportIOReporting information can be suppressed withReportSilentOther interfaces should define similar types."
},

{
    "location": "lowlevel/#DynamicHMC.rand_bool",
    "page": "Low-level building blocks",
    "title": "DynamicHMC.rand_bool",
    "category": "function",
    "text": "rand_bool(rng, prob)\n\n\nRandom boolean which is true with the given probability prob.\n\n\n\n\n\n"
},

{
    "location": "lowlevel/#Utilities-and-miscellanea-1",
    "page": "Low-level building blocks",
    "title": "Utilities and miscellanea",
    "category": "section",
    "text": "rand_bool"
},

]}
