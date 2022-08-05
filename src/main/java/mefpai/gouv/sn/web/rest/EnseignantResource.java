package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Enseignant;
import mefpai.gouv.sn.repository.EnseignantRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.EnseignantService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.Enseignant}.
 */
@RestController
@RequestMapping("/api")
public class EnseignantResource {

    private final Logger log = LoggerFactory.getLogger(EnseignantResource.class);

    private static final String ENTITY_NAME = "enseignant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EnseignantService enseignantService;

    private final EnseignantRepository enseignantRepository;

    public EnseignantResource(EnseignantService enseignantService, EnseignantRepository enseignantRepository) {
        this.enseignantService = enseignantService;
        this.enseignantRepository = enseignantRepository;
    }

    /**
     * {@code POST  /enseignants} : Create a new enseignant.
     *
     * @param enseignant the enseignant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new enseignant, or with status {@code 400 (Bad Request)} if the enseignant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/enseignants")
    public ResponseEntity<Enseignant> createEnseignant(@Valid @RequestBody Enseignant enseignant) throws URISyntaxException {
        log.debug("REST request to save Enseignant : {}", enseignant);
        if (enseignant.getId() != null) {
            throw new BadRequestAlertException("A new enseignant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enseignant result = enseignantService.save(enseignant);
        return ResponseEntity
            .created(new URI("/api/enseignants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /enseignants/:id} : Updates an existing enseignant.
     *
     * @param id the id of the enseignant to save.
     * @param enseignant the enseignant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated enseignant,
     * or with status {@code 400 (Bad Request)} if the enseignant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the enseignant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/enseignants/{id}")
    public ResponseEntity<Enseignant> updateEnseignant(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Enseignant enseignant
    ) throws URISyntaxException {
        log.debug("REST request to update Enseignant : {}, {}", id, enseignant);
        if (enseignant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, enseignant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!enseignantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Enseignant result = enseignantService.save(enseignant);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, enseignant.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /enseignants/:id} : Partial updates given fields of an existing enseignant, field will ignore if it is null
     *
     * @param id the id of the enseignant to save.
     * @param enseignant the enseignant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated enseignant,
     * or with status {@code 400 (Bad Request)} if the enseignant is not valid,
     * or with status {@code 404 (Not Found)} if the enseignant is not found,
     * or with status {@code 500 (Internal Server Error)} if the enseignant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/enseignants/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Enseignant> partialUpdateEnseignant(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Enseignant enseignant
    ) throws URISyntaxException {
        log.debug("REST request to partial update Enseignant partially : {}, {}", id, enseignant);
        if (enseignant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, enseignant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!enseignantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Enseignant> result = enseignantService.partialUpdate(enseignant);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, enseignant.getId().toString())
        );
    }

    /**
     * {@code GET  /enseignants} : get all the enseignants.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of enseignants in body.
     */
    @GetMapping("/enseignants")
    public ResponseEntity<List<Enseignant>> getAllEnseignants(Pageable pageable) {
        log.debug("REST request to get a page of Enseignants");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<Enseignant> page = enseignantService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (enseignantService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((enseignantRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /enseignants/:id} : get the "id" enseignant.
     *
     * @param id the id of the enseignant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the enseignant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/enseignants/{id}")
    public ResponseEntity<Enseignant> getEnseignant(@PathVariable Long id) {
        log.debug("REST request to get Enseignant : {}", id);
        Optional<Enseignant> enseignant = enseignantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(enseignant);
    }

    /**
     * {@code DELETE  /enseignants/:id} : delete the "id" enseignant.
     *
     * @param id the id of the enseignant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/enseignants/{id}")
    public ResponseEntity<Void> deleteEnseignant(@PathVariable Long id) {
        log.debug("REST request to delete Enseignant : {}", id);
        enseignantService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
