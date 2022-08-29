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
import mefpai.gouv.sn.domain.Concours;
import mefpai.gouv.sn.repository.ConcoursRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ConcoursResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ConcoursResourceIT {

    private static final String DEFAULT_NOM_CONCOURS = "AAAAAAAAAA";
    private static final String UPDATED_NOM_CONCOURS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_OUVERTURE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_OUVERTURE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_CLOTURE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CLOTURE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_NBRE_CANDIDATS = 1L;
    private static final Long UPDATED_NBRE_CANDIDATS = 2L;

    private static final LocalDate DEFAULT_DATE_CONCOURS = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CONCOURS = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_DELIBERATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DELIBERATION = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_NBRE_ADMIS = 1L;
    private static final Long UPDATED_NBRE_ADMIS = 2L;

    private static final String ENTITY_API_URL = "/api/concours";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ConcoursRepository concoursRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConcoursMockMvc;

    private Concours concours;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Concours createEntity(EntityManager em) {
        Concours concours = new Concours()
            .nomConcours(DEFAULT_NOM_CONCOURS)
            .dateOuverture(DEFAULT_DATE_OUVERTURE)
            .dateCloture(DEFAULT_DATE_CLOTURE)
            .nbreCandidats(DEFAULT_NBRE_CANDIDATS)
            .dateConcours(DEFAULT_DATE_CONCOURS)
            .dateDeliberation(DEFAULT_DATE_DELIBERATION)
            .nbreAdmis(DEFAULT_NBRE_ADMIS);
        return concours;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Concours createUpdatedEntity(EntityManager em) {
        Concours concours = new Concours()
            .nomConcours(UPDATED_NOM_CONCOURS)
            .dateOuverture(UPDATED_DATE_OUVERTURE)
            .dateCloture(UPDATED_DATE_CLOTURE)
            .nbreCandidats(UPDATED_NBRE_CANDIDATS)
            .dateConcours(UPDATED_DATE_CONCOURS)
            .dateDeliberation(UPDATED_DATE_DELIBERATION)
            .nbreAdmis(UPDATED_NBRE_ADMIS);
        return concours;
    }

    @BeforeEach
    public void initTest() {
        concours = createEntity(em);
    }

    @Test
    @Transactional
    void createConcours() throws Exception {
        int databaseSizeBeforeCreate = concoursRepository.findAll().size();
        // Create the Concours
        restConcoursMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(concours)))
            .andExpect(status().isCreated());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeCreate + 1);
        Concours testConcours = concoursList.get(concoursList.size() - 1);
        assertThat(testConcours.getNomConcours()).isEqualTo(DEFAULT_NOM_CONCOURS);
        assertThat(testConcours.getDateOuverture()).isEqualTo(DEFAULT_DATE_OUVERTURE);
        assertThat(testConcours.getDateCloture()).isEqualTo(DEFAULT_DATE_CLOTURE);
        assertThat(testConcours.getNbreCandidats()).isEqualTo(DEFAULT_NBRE_CANDIDATS);
        assertThat(testConcours.getDateConcours()).isEqualTo(DEFAULT_DATE_CONCOURS);
        assertThat(testConcours.getDateDeliberation()).isEqualTo(DEFAULT_DATE_DELIBERATION);
        assertThat(testConcours.getNbreAdmis()).isEqualTo(DEFAULT_NBRE_ADMIS);
    }

    @Test
    @Transactional
    void createConcoursWithExistingId() throws Exception {
        // Create the Concours with an existing ID
        concours.setId(1L);

        int databaseSizeBeforeCreate = concoursRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restConcoursMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(concours)))
            .andExpect(status().isBadRequest());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllConcours() throws Exception {
        // Initialize the database
        concoursRepository.saveAndFlush(concours);

        // Get all the concoursList
        restConcoursMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(concours.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomConcours").value(hasItem(DEFAULT_NOM_CONCOURS)))
            .andExpect(jsonPath("$.[*].dateOuverture").value(hasItem(DEFAULT_DATE_OUVERTURE.toString())))
            .andExpect(jsonPath("$.[*].dateCloture").value(hasItem(DEFAULT_DATE_CLOTURE.toString())))
            .andExpect(jsonPath("$.[*].nbreCandidats").value(hasItem(DEFAULT_NBRE_CANDIDATS.intValue())))
            .andExpect(jsonPath("$.[*].dateConcours").value(hasItem(DEFAULT_DATE_CONCOURS.toString())))
            .andExpect(jsonPath("$.[*].dateDeliberation").value(hasItem(DEFAULT_DATE_DELIBERATION.toString())))
            .andExpect(jsonPath("$.[*].nbreAdmis").value(hasItem(DEFAULT_NBRE_ADMIS.intValue())));
    }

    @Test
    @Transactional
    void getConcours() throws Exception {
        // Initialize the database
        concoursRepository.saveAndFlush(concours);

        // Get the concours
        restConcoursMockMvc
            .perform(get(ENTITY_API_URL_ID, concours.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(concours.getId().intValue()))
            .andExpect(jsonPath("$.nomConcours").value(DEFAULT_NOM_CONCOURS))
            .andExpect(jsonPath("$.dateOuverture").value(DEFAULT_DATE_OUVERTURE.toString()))
            .andExpect(jsonPath("$.dateCloture").value(DEFAULT_DATE_CLOTURE.toString()))
            .andExpect(jsonPath("$.nbreCandidats").value(DEFAULT_NBRE_CANDIDATS.intValue()))
            .andExpect(jsonPath("$.dateConcours").value(DEFAULT_DATE_CONCOURS.toString()))
            .andExpect(jsonPath("$.dateDeliberation").value(DEFAULT_DATE_DELIBERATION.toString()))
            .andExpect(jsonPath("$.nbreAdmis").value(DEFAULT_NBRE_ADMIS.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingConcours() throws Exception {
        // Get the concours
        restConcoursMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewConcours() throws Exception {
        // Initialize the database
        concoursRepository.saveAndFlush(concours);

        int databaseSizeBeforeUpdate = concoursRepository.findAll().size();

        // Update the concours
        Concours updatedConcours = concoursRepository.findById(concours.getId()).get();
        // Disconnect from session so that the updates on updatedConcours are not directly saved in db
        em.detach(updatedConcours);
        updatedConcours
            .nomConcours(UPDATED_NOM_CONCOURS)
            .dateOuverture(UPDATED_DATE_OUVERTURE)
            .dateCloture(UPDATED_DATE_CLOTURE)
            .nbreCandidats(UPDATED_NBRE_CANDIDATS)
            .dateConcours(UPDATED_DATE_CONCOURS)
            .dateDeliberation(UPDATED_DATE_DELIBERATION)
            .nbreAdmis(UPDATED_NBRE_ADMIS);

        restConcoursMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedConcours.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedConcours))
            )
            .andExpect(status().isOk());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeUpdate);
        Concours testConcours = concoursList.get(concoursList.size() - 1);
        assertThat(testConcours.getNomConcours()).isEqualTo(UPDATED_NOM_CONCOURS);
        assertThat(testConcours.getDateOuverture()).isEqualTo(UPDATED_DATE_OUVERTURE);
        assertThat(testConcours.getDateCloture()).isEqualTo(UPDATED_DATE_CLOTURE);
        assertThat(testConcours.getNbreCandidats()).isEqualTo(UPDATED_NBRE_CANDIDATS);
        assertThat(testConcours.getDateConcours()).isEqualTo(UPDATED_DATE_CONCOURS);
        assertThat(testConcours.getDateDeliberation()).isEqualTo(UPDATED_DATE_DELIBERATION);
        assertThat(testConcours.getNbreAdmis()).isEqualTo(UPDATED_NBRE_ADMIS);
    }

    @Test
    @Transactional
    void putNonExistingConcours() throws Exception {
        int databaseSizeBeforeUpdate = concoursRepository.findAll().size();
        concours.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConcoursMockMvc
            .perform(
                put(ENTITY_API_URL_ID, concours.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(concours))
            )
            .andExpect(status().isBadRequest());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchConcours() throws Exception {
        int databaseSizeBeforeUpdate = concoursRepository.findAll().size();
        concours.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConcoursMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(concours))
            )
            .andExpect(status().isBadRequest());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamConcours() throws Exception {
        int databaseSizeBeforeUpdate = concoursRepository.findAll().size();
        concours.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConcoursMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(concours)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateConcoursWithPatch() throws Exception {
        // Initialize the database
        concoursRepository.saveAndFlush(concours);

        int databaseSizeBeforeUpdate = concoursRepository.findAll().size();

        // Update the concours using partial update
        Concours partialUpdatedConcours = new Concours();
        partialUpdatedConcours.setId(concours.getId());

        partialUpdatedConcours
            .dateOuverture(UPDATED_DATE_OUVERTURE)
            .dateCloture(UPDATED_DATE_CLOTURE)
            .dateConcours(UPDATED_DATE_CONCOURS)
            .nbreAdmis(UPDATED_NBRE_ADMIS);

        restConcoursMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConcours.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConcours))
            )
            .andExpect(status().isOk());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeUpdate);
        Concours testConcours = concoursList.get(concoursList.size() - 1);
        assertThat(testConcours.getNomConcours()).isEqualTo(DEFAULT_NOM_CONCOURS);
        assertThat(testConcours.getDateOuverture()).isEqualTo(UPDATED_DATE_OUVERTURE);
        assertThat(testConcours.getDateCloture()).isEqualTo(UPDATED_DATE_CLOTURE);
        assertThat(testConcours.getNbreCandidats()).isEqualTo(DEFAULT_NBRE_CANDIDATS);
        assertThat(testConcours.getDateConcours()).isEqualTo(UPDATED_DATE_CONCOURS);
        assertThat(testConcours.getDateDeliberation()).isEqualTo(DEFAULT_DATE_DELIBERATION);
        assertThat(testConcours.getNbreAdmis()).isEqualTo(UPDATED_NBRE_ADMIS);
    }

    @Test
    @Transactional
    void fullUpdateConcoursWithPatch() throws Exception {
        // Initialize the database
        concoursRepository.saveAndFlush(concours);

        int databaseSizeBeforeUpdate = concoursRepository.findAll().size();

        // Update the concours using partial update
        Concours partialUpdatedConcours = new Concours();
        partialUpdatedConcours.setId(concours.getId());

        partialUpdatedConcours
            .nomConcours(UPDATED_NOM_CONCOURS)
            .dateOuverture(UPDATED_DATE_OUVERTURE)
            .dateCloture(UPDATED_DATE_CLOTURE)
            .nbreCandidats(UPDATED_NBRE_CANDIDATS)
            .dateConcours(UPDATED_DATE_CONCOURS)
            .dateDeliberation(UPDATED_DATE_DELIBERATION)
            .nbreAdmis(UPDATED_NBRE_ADMIS);

        restConcoursMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedConcours.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedConcours))
            )
            .andExpect(status().isOk());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeUpdate);
        Concours testConcours = concoursList.get(concoursList.size() - 1);
        assertThat(testConcours.getNomConcours()).isEqualTo(UPDATED_NOM_CONCOURS);
        assertThat(testConcours.getDateOuverture()).isEqualTo(UPDATED_DATE_OUVERTURE);
        assertThat(testConcours.getDateCloture()).isEqualTo(UPDATED_DATE_CLOTURE);
        assertThat(testConcours.getNbreCandidats()).isEqualTo(UPDATED_NBRE_CANDIDATS);
        assertThat(testConcours.getDateConcours()).isEqualTo(UPDATED_DATE_CONCOURS);
        assertThat(testConcours.getDateDeliberation()).isEqualTo(UPDATED_DATE_DELIBERATION);
        assertThat(testConcours.getNbreAdmis()).isEqualTo(UPDATED_NBRE_ADMIS);
    }

    @Test
    @Transactional
    void patchNonExistingConcours() throws Exception {
        int databaseSizeBeforeUpdate = concoursRepository.findAll().size();
        concours.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConcoursMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, concours.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(concours))
            )
            .andExpect(status().isBadRequest());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchConcours() throws Exception {
        int databaseSizeBeforeUpdate = concoursRepository.findAll().size();
        concours.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConcoursMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(concours))
            )
            .andExpect(status().isBadRequest());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamConcours() throws Exception {
        int databaseSizeBeforeUpdate = concoursRepository.findAll().size();
        concours.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restConcoursMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(concours)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Concours in the database
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteConcours() throws Exception {
        // Initialize the database
        concoursRepository.saveAndFlush(concours);

        int databaseSizeBeforeDelete = concoursRepository.findAll().size();

        // Delete the concours
        restConcoursMockMvc
            .perform(delete(ENTITY_API_URL_ID, concours.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Concours> concoursList = concoursRepository.findAll();
        assertThat(concoursList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
