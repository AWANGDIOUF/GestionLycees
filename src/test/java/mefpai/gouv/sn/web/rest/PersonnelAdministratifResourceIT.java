package mefpai.gouv.sn.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import mefpai.gouv.sn.IntegrationTest;
import mefpai.gouv.sn.domain.PersonnelAdministratif;
import mefpai.gouv.sn.domain.enumeration.FonctionPersAd;
import mefpai.gouv.sn.domain.enumeration.Situation;
import mefpai.gouv.sn.repository.PersonnelAdministratifRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PersonnelAdministratifResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PersonnelAdministratifResourceIT {

    private static final String DEFAULT_MATRICULE = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final Situation DEFAULT_SITUATION_MATRIMONIALE = Situation.MARIE;
    private static final Situation UPDATED_SITUATION_MATRIMONIALE = Situation.MARIEE;

    private static final FonctionPersAd DEFAULT_FONCTION = FonctionPersAd.PROVISEUR;
    private static final FonctionPersAd UPDATED_FONCTION = FonctionPersAd.SECRETAIRE;

    private static final String DEFAULT_AUTRE_FONCTION = "AAAAAAAAAA";
    private static final String UPDATED_AUTRE_FONCTION = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_MAIL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/personnel-administratifs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PersonnelAdministratifRepository personnelAdministratifRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPersonnelAdministratifMockMvc;

    private PersonnelAdministratif personnelAdministratif;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonnelAdministratif createEntity(EntityManager em) {
        PersonnelAdministratif personnelAdministratif = new PersonnelAdministratif()
            .matricule(DEFAULT_MATRICULE)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .situationMatrimoniale(DEFAULT_SITUATION_MATRIMONIALE)
            .fonction(DEFAULT_FONCTION)
            .autreFonction(DEFAULT_AUTRE_FONCTION)
            .telephone(DEFAULT_TELEPHONE)
            .mail(DEFAULT_MAIL);
        return personnelAdministratif;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PersonnelAdministratif createUpdatedEntity(EntityManager em) {
        PersonnelAdministratif personnelAdministratif = new PersonnelAdministratif()
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE)
            .fonction(UPDATED_FONCTION)
            .autreFonction(UPDATED_AUTRE_FONCTION)
            .telephone(UPDATED_TELEPHONE)
            .mail(UPDATED_MAIL);
        return personnelAdministratif;
    }

    @BeforeEach
    public void initTest() {
        personnelAdministratif = createEntity(em);
    }

    @Test
    @Transactional
    void createPersonnelAdministratif() throws Exception {
        int databaseSizeBeforeCreate = personnelAdministratifRepository.findAll().size();
        // Create the PersonnelAdministratif
        restPersonnelAdministratifMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isCreated());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeCreate + 1);
        PersonnelAdministratif testPersonnelAdministratif = personnelAdministratifList.get(personnelAdministratifList.size() - 1);
        assertThat(testPersonnelAdministratif.getMatricule()).isEqualTo(DEFAULT_MATRICULE);
        assertThat(testPersonnelAdministratif.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPersonnelAdministratif.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testPersonnelAdministratif.getSituationMatrimoniale()).isEqualTo(DEFAULT_SITUATION_MATRIMONIALE);
        assertThat(testPersonnelAdministratif.getFonction()).isEqualTo(DEFAULT_FONCTION);
        assertThat(testPersonnelAdministratif.getAutreFonction()).isEqualTo(DEFAULT_AUTRE_FONCTION);
        assertThat(testPersonnelAdministratif.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testPersonnelAdministratif.getMail()).isEqualTo(DEFAULT_MAIL);
    }

    @Test
    @Transactional
    void createPersonnelAdministratifWithExistingId() throws Exception {
        // Create the PersonnelAdministratif with an existing ID
        personnelAdministratif.setId(1L);

        int databaseSizeBeforeCreate = personnelAdministratifRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonnelAdministratifMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkMatriculeIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAdministratifRepository.findAll().size();
        // set the field null
        personnelAdministratif.setMatricule(null);

        // Create the PersonnelAdministratif, which fails.

        restPersonnelAdministratifMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAdministratifRepository.findAll().size();
        // set the field null
        personnelAdministratif.setNom(null);

        // Create the PersonnelAdministratif, which fails.

        restPersonnelAdministratifMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAdministratifRepository.findAll().size();
        // set the field null
        personnelAdministratif.setPrenom(null);

        // Create the PersonnelAdministratif, which fails.

        restPersonnelAdministratifMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSituationMatrimonialeIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAdministratifRepository.findAll().size();
        // set the field null
        personnelAdministratif.setSituationMatrimoniale(null);

        // Create the PersonnelAdministratif, which fails.

        restPersonnelAdministratifMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkFonctionIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAdministratifRepository.findAll().size();
        // set the field null
        personnelAdministratif.setFonction(null);

        // Create the PersonnelAdministratif, which fails.

        restPersonnelAdministratifMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTelephoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAdministratifRepository.findAll().size();
        // set the field null
        personnelAdministratif.setTelephone(null);

        // Create the PersonnelAdministratif, which fails.

        restPersonnelAdministratifMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkMailIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelAdministratifRepository.findAll().size();
        // set the field null
        personnelAdministratif.setMail(null);

        // Create the PersonnelAdministratif, which fails.

        restPersonnelAdministratifMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPersonnelAdministratifs() throws Exception {
        // Initialize the database
        personnelAdministratifRepository.saveAndFlush(personnelAdministratif);

        // Get all the personnelAdministratifList
        restPersonnelAdministratifMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personnelAdministratif.getId().intValue())))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].situationMatrimoniale").value(hasItem(DEFAULT_SITUATION_MATRIMONIALE.toString())))
            .andExpect(jsonPath("$.[*].fonction").value(hasItem(DEFAULT_FONCTION.toString())))
            .andExpect(jsonPath("$.[*].autreFonction").value(hasItem(DEFAULT_AUTRE_FONCTION)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL)));
    }

    @Test
    @Transactional
    void getPersonnelAdministratif() throws Exception {
        // Initialize the database
        personnelAdministratifRepository.saveAndFlush(personnelAdministratif);

        // Get the personnelAdministratif
        restPersonnelAdministratifMockMvc
            .perform(get(ENTITY_API_URL_ID, personnelAdministratif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(personnelAdministratif.getId().intValue()))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.situationMatrimoniale").value(DEFAULT_SITUATION_MATRIMONIALE.toString()))
            .andExpect(jsonPath("$.fonction").value(DEFAULT_FONCTION.toString()))
            .andExpect(jsonPath("$.autreFonction").value(DEFAULT_AUTRE_FONCTION))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL));
    }

    @Test
    @Transactional
    void getNonExistingPersonnelAdministratif() throws Exception {
        // Get the personnelAdministratif
        restPersonnelAdministratifMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPersonnelAdministratif() throws Exception {
        // Initialize the database
        personnelAdministratifRepository.saveAndFlush(personnelAdministratif);

        int databaseSizeBeforeUpdate = personnelAdministratifRepository.findAll().size();

        // Update the personnelAdministratif
        PersonnelAdministratif updatedPersonnelAdministratif = personnelAdministratifRepository
            .findById(personnelAdministratif.getId())
            .get();
        // Disconnect from session so that the updates on updatedPersonnelAdministratif are not directly saved in db
        em.detach(updatedPersonnelAdministratif);
        updatedPersonnelAdministratif
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE)
            .fonction(UPDATED_FONCTION)
            .autreFonction(UPDATED_AUTRE_FONCTION)
            .telephone(UPDATED_TELEPHONE)
            .mail(UPDATED_MAIL);

        restPersonnelAdministratifMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPersonnelAdministratif.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPersonnelAdministratif))
            )
            .andExpect(status().isOk());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeUpdate);
        PersonnelAdministratif testPersonnelAdministratif = personnelAdministratifList.get(personnelAdministratifList.size() - 1);
        assertThat(testPersonnelAdministratif.getMatricule()).isEqualTo(UPDATED_MATRICULE);
        assertThat(testPersonnelAdministratif.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersonnelAdministratif.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersonnelAdministratif.getSituationMatrimoniale()).isEqualTo(UPDATED_SITUATION_MATRIMONIALE);
        assertThat(testPersonnelAdministratif.getFonction()).isEqualTo(UPDATED_FONCTION);
        assertThat(testPersonnelAdministratif.getAutreFonction()).isEqualTo(UPDATED_AUTRE_FONCTION);
        assertThat(testPersonnelAdministratif.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testPersonnelAdministratif.getMail()).isEqualTo(UPDATED_MAIL);
    }

    @Test
    @Transactional
    void putNonExistingPersonnelAdministratif() throws Exception {
        int databaseSizeBeforeUpdate = personnelAdministratifRepository.findAll().size();
        personnelAdministratif.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonnelAdministratifMockMvc
            .perform(
                put(ENTITY_API_URL_ID, personnelAdministratif.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPersonnelAdministratif() throws Exception {
        int databaseSizeBeforeUpdate = personnelAdministratifRepository.findAll().size();
        personnelAdministratif.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonnelAdministratifMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPersonnelAdministratif() throws Exception {
        int databaseSizeBeforeUpdate = personnelAdministratifRepository.findAll().size();
        personnelAdministratif.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonnelAdministratifMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePersonnelAdministratifWithPatch() throws Exception {
        // Initialize the database
        personnelAdministratifRepository.saveAndFlush(personnelAdministratif);

        int databaseSizeBeforeUpdate = personnelAdministratifRepository.findAll().size();

        // Update the personnelAdministratif using partial update
        PersonnelAdministratif partialUpdatedPersonnelAdministratif = new PersonnelAdministratif();
        partialUpdatedPersonnelAdministratif.setId(personnelAdministratif.getId());

        partialUpdatedPersonnelAdministratif
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE);

        restPersonnelAdministratifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersonnelAdministratif.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersonnelAdministratif))
            )
            .andExpect(status().isOk());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeUpdate);
        PersonnelAdministratif testPersonnelAdministratif = personnelAdministratifList.get(personnelAdministratifList.size() - 1);
        assertThat(testPersonnelAdministratif.getMatricule()).isEqualTo(UPDATED_MATRICULE);
        assertThat(testPersonnelAdministratif.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersonnelAdministratif.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersonnelAdministratif.getSituationMatrimoniale()).isEqualTo(UPDATED_SITUATION_MATRIMONIALE);
        assertThat(testPersonnelAdministratif.getFonction()).isEqualTo(DEFAULT_FONCTION);
        assertThat(testPersonnelAdministratif.getAutreFonction()).isEqualTo(DEFAULT_AUTRE_FONCTION);
        assertThat(testPersonnelAdministratif.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testPersonnelAdministratif.getMail()).isEqualTo(DEFAULT_MAIL);
    }

    @Test
    @Transactional
    void fullUpdatePersonnelAdministratifWithPatch() throws Exception {
        // Initialize the database
        personnelAdministratifRepository.saveAndFlush(personnelAdministratif);

        int databaseSizeBeforeUpdate = personnelAdministratifRepository.findAll().size();

        // Update the personnelAdministratif using partial update
        PersonnelAdministratif partialUpdatedPersonnelAdministratif = new PersonnelAdministratif();
        partialUpdatedPersonnelAdministratif.setId(personnelAdministratif.getId());

        partialUpdatedPersonnelAdministratif
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .situationMatrimoniale(UPDATED_SITUATION_MATRIMONIALE)
            .fonction(UPDATED_FONCTION)
            .autreFonction(UPDATED_AUTRE_FONCTION)
            .telephone(UPDATED_TELEPHONE)
            .mail(UPDATED_MAIL);

        restPersonnelAdministratifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPersonnelAdministratif.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPersonnelAdministratif))
            )
            .andExpect(status().isOk());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeUpdate);
        PersonnelAdministratif testPersonnelAdministratif = personnelAdministratifList.get(personnelAdministratifList.size() - 1);
        assertThat(testPersonnelAdministratif.getMatricule()).isEqualTo(UPDATED_MATRICULE);
        assertThat(testPersonnelAdministratif.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersonnelAdministratif.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersonnelAdministratif.getSituationMatrimoniale()).isEqualTo(UPDATED_SITUATION_MATRIMONIALE);
        assertThat(testPersonnelAdministratif.getFonction()).isEqualTo(UPDATED_FONCTION);
        assertThat(testPersonnelAdministratif.getAutreFonction()).isEqualTo(UPDATED_AUTRE_FONCTION);
        assertThat(testPersonnelAdministratif.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testPersonnelAdministratif.getMail()).isEqualTo(UPDATED_MAIL);
    }

    @Test
    @Transactional
    void patchNonExistingPersonnelAdministratif() throws Exception {
        int databaseSizeBeforeUpdate = personnelAdministratifRepository.findAll().size();
        personnelAdministratif.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonnelAdministratifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, personnelAdministratif.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPersonnelAdministratif() throws Exception {
        int databaseSizeBeforeUpdate = personnelAdministratifRepository.findAll().size();
        personnelAdministratif.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonnelAdministratifMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isBadRequest());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPersonnelAdministratif() throws Exception {
        int databaseSizeBeforeUpdate = personnelAdministratifRepository.findAll().size();
        personnelAdministratif.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPersonnelAdministratifMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(personnelAdministratif))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PersonnelAdministratif in the database
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePersonnelAdministratif() throws Exception {
        // Initialize the database
        personnelAdministratifRepository.saveAndFlush(personnelAdministratif);

        int databaseSizeBeforeDelete = personnelAdministratifRepository.findAll().size();

        // Delete the personnelAdministratif
        restPersonnelAdministratifMockMvc
            .perform(delete(ENTITY_API_URL_ID, personnelAdministratif.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PersonnelAdministratif> personnelAdministratifList = personnelAdministratifRepository.findAll();
        assertThat(personnelAdministratifList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
