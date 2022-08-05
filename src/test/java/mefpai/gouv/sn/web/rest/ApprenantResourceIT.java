package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.Apprenant;
import mefpai.gouv.sn.domain.enumeration.Genre;
import mefpai.gouv.sn.domain.enumeration.Option;
import mefpai.gouv.sn.domain.enumeration.Situation;
import mefpai.gouv.sn.repository.ApprenantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ApprenantResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ApprenantResourceIT {

    private static final String DEFAULT_NOM_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM_PRENOM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_NAISSANCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_NAISSANCE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_LIEU_NAISSANCE = "AAAAAAAAAA";
    private static final String UPDATED_LIEU_NAISSANCE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final Genre DEFAULT_SEXE = Genre.F;
    private static final Genre UPDATED_SEXE = Genre.M;

    private static final Option DEFAULT_OPTION = Option.ENSEIGNEMENT_TECHNIQUE;
    private static final Option UPDATED_OPTION = Option.FORMATION_PROFESSIONNELLE;

    private static final Situation DEFAULT_SITUATION_MATRIMONIALE = Situation.MARIE;
    private static final Situation UPDATED_SITUATION_MATRIMONIALE = Situation.MARIEE;

    private static final String DEFAULT_TUTEUR = "AAAAAAAAAA";
    private static final String UPDATED_TUTEUR = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACT_TUTEUR = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_TUTEUR = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/apprenants";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ApprenantRepository apprenantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restApprenantMockMvc;

    private Apprenant apprenant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Apprenant createEntity(EntityManager em) {
        Apprenant apprenant = new Apprenant()
            .nomPrenom(DEFAULT_NOM_PRENOM)
            .dateNaissance(DEFAULT_DATE_NAISSANCE)
            .lieuNaissance(DEFAULT_LIEU_NAISSANCE)
            .telephone(DEFAULT_TELEPHONE)
            .adresse(DEFAULT_ADRESSE)
            .sexe(DEFAULT_SEXE)
            .option(DEFAULT_OPTION)
            .situationMatrimoniale(DEFAULT_SITUATION_MATRIMONIALE)
            .tuteur(DEFAULT_TUTEUR)
            .contactTuteur(DEFAULT_CONTACT_TUTEUR);
        return apprenant;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Apprenant createUpdatedEntity(EntityManager em) {
        Apprenant apprenant = new Apprenant()
            .nomPrenom(UPDATED_NOM_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .lieuNaissance(UPDATED_LIEU_NAISSANCE)
            .telephone(UPDATED_TELEPHONE)
            .adresse(UPDATED_ADRESSE)
            .sexe(UPDATED_SEXE)
            .option(UPDATED_OPTION)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE)
            .tuteur(UPDATED_TUTEUR)
            .contactTuteur(UPDATED_CONTACT_TUTEUR);
        return apprenant;
    }

    @BeforeEach
    public void initTest() {
        apprenant = createEntity(em);
    }

    @Test
    @Transactional
    void createApprenant() throws Exception {
        int databaseSizeBeforeCreate = apprenantRepository.findAll().size();
        // Create the Apprenant
        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isCreated());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeCreate + 1);
        Apprenant testApprenant = apprenantList.get(apprenantList.size() - 1);
        assertThat(testApprenant.getNomPrenom()).isEqualTo(DEFAULT_NOM_PRENOM);
        assertThat(testApprenant.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
        assertThat(testApprenant.getLieuNaissance()).isEqualTo(DEFAULT_LIEU_NAISSANCE);
        assertThat(testApprenant.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testApprenant.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testApprenant.getSexe()).isEqualTo(DEFAULT_SEXE);
        assertThat(testApprenant.getOption()).isEqualTo(DEFAULT_OPTION);
        assertThat(testApprenant.getSituationMatrimoniale()).isEqualTo(DEFAULT_SITUATION_MATRIMONIALE);
        assertThat(testApprenant.getTuteur()).isEqualTo(DEFAULT_TUTEUR);
        assertThat(testApprenant.getContactTuteur()).isEqualTo(DEFAULT_CONTACT_TUTEUR);
    }

    @Test
    @Transactional
    void createApprenantWithExistingId() throws Exception {
        // Create the Apprenant with an existing ID
        apprenant.setId(1L);

        int databaseSizeBeforeCreate = apprenantRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = apprenantRepository.findAll().size();
        // set the field null
        apprenant.setNomPrenom(null);

        // Create the Apprenant, which fails.

        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateNaissanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = apprenantRepository.findAll().size();
        // set the field null
        apprenant.setDateNaissance(null);

        // Create the Apprenant, which fails.

        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLieuNaissanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = apprenantRepository.findAll().size();
        // set the field null
        apprenant.setLieuNaissance(null);

        // Create the Apprenant, which fails.

        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = apprenantRepository.findAll().size();
        // set the field null
        apprenant.setTelephone(null);

        // Create the Apprenant, which fails.

        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = apprenantRepository.findAll().size();
        // set the field null
        apprenant.setAdresse(null);

        // Create the Apprenant, which fails.

        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSexeIsRequired() throws Exception {
        int databaseSizeBeforeTest = apprenantRepository.findAll().size();
        // set the field null
        apprenant.setSexe(null);

        // Create the Apprenant, which fails.

        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSituationMatrimonialeIsRequired() throws Exception {
        int databaseSizeBeforeTest = apprenantRepository.findAll().size();
        // set the field null
        apprenant.setSituationMatrimoniale(null);

        // Create the Apprenant, which fails.

        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTuteurIsRequired() throws Exception {
        int databaseSizeBeforeTest = apprenantRepository.findAll().size();
        // set the field null
        apprenant.setTuteur(null);

        // Create the Apprenant, which fails.

        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkContactTuteurIsRequired() throws Exception {
        int databaseSizeBeforeTest = apprenantRepository.findAll().size();
        // set the field null
        apprenant.setContactTuteur(null);

        // Create the Apprenant, which fails.

        restApprenantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isBadRequest());

        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllApprenants() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        // Get all the apprenantList
        restApprenantMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(apprenant.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomPrenom").value(hasItem(DEFAULT_NOM_PRENOM)))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].lieuNaissance").value(hasItem(DEFAULT_LIEU_NAISSANCE)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].sexe").value(hasItem(DEFAULT_SEXE.toString())))
            .andExpect(jsonPath("$.[*].option").value(hasItem(DEFAULT_OPTION.toString())))
            .andExpect(jsonPath("$.[*].situationMatrimoniale").value(hasItem(DEFAULT_SITUATION_MATRIMONIALE.toString())))
            .andExpect(jsonPath("$.[*].tuteur").value(hasItem(DEFAULT_TUTEUR)))
            .andExpect(jsonPath("$.[*].contactTuteur").value(hasItem(DEFAULT_CONTACT_TUTEUR)));
    }

    @Test
    @Transactional
    void getApprenant() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        // Get the apprenant
        restApprenantMockMvc
            .perform(get(ENTITY_API_URL_ID, apprenant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(apprenant.getId().intValue()))
            .andExpect(jsonPath("$.nomPrenom").value(DEFAULT_NOM_PRENOM))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()))
            .andExpect(jsonPath("$.lieuNaissance").value(DEFAULT_LIEU_NAISSANCE))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.sexe").value(DEFAULT_SEXE.toString()))
            .andExpect(jsonPath("$.option").value(DEFAULT_OPTION.toString()))
            .andExpect(jsonPath("$.situationMatrimoniale").value(DEFAULT_SITUATION_MATRIMONIALE.toString()))
            .andExpect(jsonPath("$.tuteur").value(DEFAULT_TUTEUR))
            .andExpect(jsonPath("$.contactTuteur").value(DEFAULT_CONTACT_TUTEUR));
    }

    @Test
    @Transactional
    void getNonExistingApprenant() throws Exception {
        // Get the apprenant
        restApprenantMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewApprenant() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();

        // Update the apprenant
        Apprenant updatedApprenant = apprenantRepository.findById(apprenant.getId()).get();
        // Disconnect from session so that the updates on updatedApprenant are not directly saved in db
        em.detach(updatedApprenant);
        updatedApprenant
            .nomPrenom(UPDATED_NOM_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .lieuNaissance(UPDATED_LIEU_NAISSANCE)
            .telephone(UPDATED_TELEPHONE)
            .adresse(UPDATED_ADRESSE)
            .sexe(UPDATED_SEXE)
            .option(UPDATED_OPTION)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE)
            .tuteur(UPDATED_TUTEUR)
            .contactTuteur(UPDATED_CONTACT_TUTEUR);

        restApprenantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedApprenant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedApprenant))
            )
            .andExpect(status().isOk());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
        Apprenant testApprenant = apprenantList.get(apprenantList.size() - 1);
        assertThat(testApprenant.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
        assertThat(testApprenant.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testApprenant.getLieuNaissance()).isEqualTo(UPDATED_LIEU_NAISSANCE);
        assertThat(testApprenant.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testApprenant.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testApprenant.getSexe()).isEqualTo(UPDATED_SEXE);
        assertThat(testApprenant.getOption()).isEqualTo(UPDATED_OPTION);
        assertThat(testApprenant.getSituationMatrimoniale()).isEqualTo(UPDATED_SITUATION_MATRIMONIALE);
        assertThat(testApprenant.getTuteur()).isEqualTo(UPDATED_TUTEUR);
        assertThat(testApprenant.getContactTuteur()).isEqualTo(UPDATED_CONTACT_TUTEUR);
    }

    @Test
    @Transactional
    void putNonExistingApprenant() throws Exception {
        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();
        apprenant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApprenantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, apprenant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apprenant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchApprenant() throws Exception {
        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();
        apprenant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprenantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(apprenant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamApprenant() throws Exception {
        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();
        apprenant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprenantMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(apprenant)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateApprenantWithPatch() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();

        // Update the apprenant using partial update
        Apprenant partialUpdatedApprenant = new Apprenant();
        partialUpdatedApprenant.setId(apprenant.getId());

        partialUpdatedApprenant
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .telephone(UPDATED_TELEPHONE)
            .adresse(UPDATED_ADRESSE)
            .sexe(UPDATED_SEXE)
            .option(UPDATED_OPTION)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE);

        restApprenantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApprenant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedApprenant))
            )
            .andExpect(status().isOk());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
        Apprenant testApprenant = apprenantList.get(apprenantList.size() - 1);
        assertThat(testApprenant.getNomPrenom()).isEqualTo(DEFAULT_NOM_PRENOM);
        assertThat(testApprenant.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testApprenant.getLieuNaissance()).isEqualTo(DEFAULT_LIEU_NAISSANCE);
        assertThat(testApprenant.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testApprenant.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testApprenant.getSexe()).isEqualTo(UPDATED_SEXE);
        assertThat(testApprenant.getOption()).isEqualTo(UPDATED_OPTION);
        assertThat(testApprenant.getSituationMatrimoniale()).isEqualTo(UPDATED_SITUATION_MATRIMONIALE);
        assertThat(testApprenant.getTuteur()).isEqualTo(DEFAULT_TUTEUR);
        assertThat(testApprenant.getContactTuteur()).isEqualTo(DEFAULT_CONTACT_TUTEUR);
    }

    @Test
    @Transactional
    void fullUpdateApprenantWithPatch() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();

        // Update the apprenant using partial update
        Apprenant partialUpdatedApprenant = new Apprenant();
        partialUpdatedApprenant.setId(apprenant.getId());

        partialUpdatedApprenant
            .nomPrenom(UPDATED_NOM_PRENOM)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .lieuNaissance(UPDATED_LIEU_NAISSANCE)
            .telephone(UPDATED_TELEPHONE)
            .adresse(UPDATED_ADRESSE)
            .sexe(UPDATED_SEXE)
            .option(UPDATED_OPTION)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE)
            .tuteur(UPDATED_TUTEUR)
            .contactTuteur(UPDATED_CONTACT_TUTEUR);

        restApprenantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedApprenant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedApprenant))
            )
            .andExpect(status().isOk());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
        Apprenant testApprenant = apprenantList.get(apprenantList.size() - 1);
        assertThat(testApprenant.getNomPrenom()).isEqualTo(UPDATED_NOM_PRENOM);
        assertThat(testApprenant.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testApprenant.getLieuNaissance()).isEqualTo(UPDATED_LIEU_NAISSANCE);
        assertThat(testApprenant.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testApprenant.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testApprenant.getSexe()).isEqualTo(UPDATED_SEXE);
        assertThat(testApprenant.getOption()).isEqualTo(UPDATED_OPTION);
        assertThat(testApprenant.getSituationMatrimoniale()).isEqualTo(UPDATED_SITUATION_MATRIMONIALE);
        assertThat(testApprenant.getTuteur()).isEqualTo(UPDATED_TUTEUR);
        assertThat(testApprenant.getContactTuteur()).isEqualTo(UPDATED_CONTACT_TUTEUR);
    }

    @Test
    @Transactional
    void patchNonExistingApprenant() throws Exception {
        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();
        apprenant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApprenantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, apprenant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(apprenant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchApprenant() throws Exception {
        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();
        apprenant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprenantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(apprenant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamApprenant() throws Exception {
        int databaseSizeBeforeUpdate = apprenantRepository.findAll().size();
        apprenant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restApprenantMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(apprenant))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Apprenant in the database
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteApprenant() throws Exception {
        // Initialize the database
        apprenantRepository.saveAndFlush(apprenant);

        int databaseSizeBeforeDelete = apprenantRepository.findAll().size();

        // Delete the apprenant
        restApprenantMockMvc
            .perform(delete(ENTITY_API_URL_ID, apprenant.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Apprenant> apprenantList = apprenantRepository.findAll();
        assertThat(apprenantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
